import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Itinerary from '../components/Itinerary';
import BudgetCalculator from '../components/BudgetCalculator';
import ActivityForm from '../components/ActivityForm';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import { DESTINATIONS, FALLBACK_IMAGE } from '../data/destinations';
import { calculateTripDays, formatDate, calculateTripBudget } from '../utils/budget';

/**
 * TripPlanner Page - Core application feature with Day-by-Day Itinerary & Dynamic Budgeting
 */
export default function TripPlanner({ trips = [], onUpdateTrip, onEditTripModal }) {
  const { tripId } = useParams();

  // Find the active trip
  const trip = trips.find((t) => String(t.id) === String(tripId));

  // Find the associated destination
  const destination = trip
    ? DESTINATIONS.find((d) => d.id === Number(trip.destinationId))
    : null;

  // Local state for Activity creation / editing / deletion
  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activityDefaultDay, setActivityDefaultDay] = useState(1);
  const [activityToDelete, setActivityToDelete] = useState(null);

  if (!trip) {
    return (
      <div className="page-container container">
        <EmptyState
          title="Trip Not Found"
          message="The trip you are looking for does not exist or may have been deleted."
          icon="🗺️"
          actionLabel="View All Trips"
          actionLink="/trips"
        />
      </div>
    );
  }

  const days = calculateTripDays(trip.startDate, trip.endDate);
  const budgetInfo = calculateTripBudget(trip, destination);

  // Trigger Add Activity Form
  const handleOpenAddActivity = (dayNumber = 1) => {
    setEditingActivity(null);
    setActivityDefaultDay(dayNumber);
    setIsActivityFormOpen(true);
  };

  // Trigger Edit Activity Form
  const handleOpenEditActivity = (activity) => {
    setEditingActivity(activity);
    setActivityDefaultDay(activity.day || 1);
    setIsActivityFormOpen(true);
  };

  // Submit Activity (Add or Edit)
  const handleSaveActivity = (activityData) => {
    const existingActivities = trip.activities || [];
    let updatedActivities;

    if (editingActivity) {
      // Update existing
      updatedActivities = existingActivities.map((act) =>
        act.id === activityData.id ? activityData : act
      );
    } else {
      // Add new
      updatedActivities = [...existingActivities, activityData];
    }

    const updatedTrip = {
      ...trip,
      activities: updatedActivities
    };

    onUpdateTrip(updatedTrip);
    setIsActivityFormOpen(false);
    setEditingActivity(null);
  };

  // Activity Deletion with Confirmation Modal
  const handleDeleteActivityRequest = (activity) => {
    setActivityToDelete(activity);
  };

  const handleConfirmDeleteActivity = () => {
    if (activityToDelete) {
      const updatedActivities = (trip.activities || []).filter(
        (a) => a.id !== activityToDelete.id
      );
      const updatedTrip = {
        ...trip,
        activities: updatedActivities
      };
      onUpdateTrip(updatedTrip);
      setActivityToDelete(null);
    }
  };

  // Update budget limit
  const handleUpdateBudgetLimit = (newLimit) => {
    const updatedTrip = {
      ...trip,
      budgetLimit: newLimit
    };
    onUpdateTrip(updatedTrip);
  };

  return (
    <div className="trip-planner-page page-container">
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Link to="/trips" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            ← Back to All Trips
          </Link>
        </div>

        {/* Trip Overview Header Card */}
        <section className="trip-planner-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <img
              src={destination?.image || FALLBACK_IMAGE}
              alt={destination?.name || "Trip destination"}
              style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGE;
              }}
            />

            <div>
              <h1 style={{ fontSize: '2.1rem', marginBottom: '0.25rem' }}>
                {trip.name}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                📍 {destination ? `${destination.name}, ${destination.country}` : trip.destinationName || 'Custom'}
              </p>

              <div className="trip-overview-badges">
                <span className="trip-badge">
                  📅 {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                </span>
                <span className="trip-badge">
                  ⏱️ {days} {days === 1 ? 'Day' : 'Days'}
                </span>
                <span className="trip-badge">
                  👥 {trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}
                </span>
                <span className="trip-badge" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', fontWeight: 700 }}>
                  💵 Est. Budget: ${budgetInfo.grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onEditTripModal(trip)}
            >
              ✏️ Edit Trip Details
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleOpenAddActivity(1)}
            >
              + Add Activity
            </button>
          </div>
        </section>

        {/* 2-Column Layout: Itinerary on Left, Budget Calculator on Right */}
        <div className="planner-layout-grid">
          {/* Left Column: Itinerary */}
          <main>
            <Itinerary
              totalDays={days}
              startDate={trip.startDate}
              activities={trip.activities || []}
              onAddActivity={handleOpenAddActivity}
              onEditActivity={handleOpenEditActivity}
              onDeleteActivity={handleDeleteActivityRequest}
            />
          </main>

          {/* Right Column: Dynamic Budget Calculator */}
          <aside>
            <BudgetCalculator
              trip={trip}
              destination={destination}
              onUpdateBudgetLimit={handleUpdateBudgetLimit}
            />
          </aside>
        </div>

        {/* Add/Edit Activity Modal */}
        <ActivityForm
          isOpen={isActivityFormOpen}
          onClose={() => {
            setIsActivityFormOpen(false);
            setEditingActivity(null);
          }}
          onSubmit={handleSaveActivity}
          initialActivity={editingActivity}
          totalDays={days}
          defaultDay={activityDefaultDay}
        />

        {/* Delete Activity Confirmation Modal */}
        <ConfirmModal
          isOpen={!!activityToDelete}
          title="Delete Activity"
          message={`Are you sure you want to delete "${activityToDelete?.title}" from Day ${activityToDelete?.day}?`}
          confirmLabel="Delete Activity"
          cancelLabel="Keep Activity"
          isDanger={true}
          onConfirm={handleConfirmDeleteActivity}
          onCancel={() => setActivityToDelete(null)}
        />
      </div>
    </div>
  );
}
