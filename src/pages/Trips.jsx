import React, { useState } from 'react';
import TripCard from '../components/TripCard';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { DESTINATIONS } from '../data/destinations';

/**
 * Trips Page - Displays all planned trips saved in localStorage
 */
export default function Trips({ trips = [], onEditTrip, onDeleteTrip, onOpenPlanModal }) {
  const [tripToDelete, setTripToDelete] = useState(null);

  const handleDeleteRequest = (trip) => {
    setTripToDelete(trip);
  };

  const handleConfirmDelete = () => {
    if (tripToDelete) {
      onDeleteTrip(tripToDelete.id);
      setTripToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTripToDelete(null);
  };

  return (
    <div className="trips-page page-container">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="section-title">My Trips</h1>
            <p className="section-subtitle">
              Manage your upcoming vacations, itineraries, and overall budget estimates.
            </p>
          </div>

          {trips.length > 0 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenPlanModal()}
            >
              + Create New Trip
            </button>
          )}
        </div>

        {trips.length === 0 ? (
          <EmptyState
            title="You haven't created any trips yet."
            message="Organize your dream vacation with day-by-day schedules, activities, and budget limits."
            icon="🎒"
            actionLabel="Plan a Trip"
            onAction={() => onOpenPlanModal()}
          />
        ) : (
          <div className="trips-grid">
            {trips.map((trip) => {
              const destination = DESTINATIONS.find((d) => d.id === Number(trip.destinationId));
              return (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  destination={destination}
                  onEdit={onEditTrip}
                  onDelete={handleDeleteRequest}
                />
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!tripToDelete}
          title="Delete Trip"
          message={`Are you sure you want to delete "${tripToDelete?.name}"? All itinerary activities and budget data for this trip will be removed.`}
          confirmLabel="Delete Trip"
          cancelLabel="Keep Trip"
          isDanger={true}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}
