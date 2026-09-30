import React from 'react';
import { Link } from 'react-router-dom';
import { calculateTripDays, calculateTripBudget, formatDate } from '../utils/budget';
import { FALLBACK_IMAGE } from '../data/destinations';

/**
 * TripCard - Displays an overview card for a saved trip in My Trips
 */
export default function TripCard({ trip, destination, onEdit, onDelete }) {
  if (!trip) return null;

  const days = calculateTripDays(trip.startDate, trip.endDate);
  const budgetInfo = calculateTripBudget(trip, destination);
  const activityCount = trip.activities?.length || 0;

  const destImage = destination?.image || FALLBACK_IMAGE;

  return (
    <article className="trip-card">
      <div className="trip-card-banner">
        <img
          src={destImage}
          alt={trip.destinationName || destination?.name || "Trip destination"}
          className="trip-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE;
          }}
        />
        <span className="trip-card-badge-days">
          🗓️ {days} {days === 1 ? 'Day' : 'Days'}
        </span>
      </div>

      <div className="trip-card-body">
        <h3 className="trip-card-title">{trip.name}</h3>
        <p className="trip-card-destination">
          📍 {destination ? `${destination.name}, ${destination.country}` : trip.destinationName || "Custom Destination"}
        </p>

        {/* Key stats row */}
        <div className="trip-card-stats">
          <div className="trip-stat-item">
            <span className="trip-stat-label">Dates</span>
            <div className="trip-stat-value" style={{ fontSize: '0.85rem' }}>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </div>
          </div>

          <div className="trip-stat-item">
            <span className="trip-stat-label">Travelers</span>
            <div className="trip-stat-value">
              👥 {trip.travelers || 1}
            </div>
          </div>

          <div className="trip-stat-item">
            <span className="trip-stat-label">Estimated</span>
            <div className="trip-stat-value" style={{ color: 'var(--primary)' }}>
              ${budgetInfo.grandTotal.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            📝 <strong>{activityCount}</strong> {activityCount === 1 ? 'activity' : 'activities'} planned
          </span>
          {trip.budgetLimit > 0 && (
            <span style={{ fontSize: '0.85rem', color: budgetInfo.isOverBudget ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
              {budgetInfo.isOverBudget ? 'Over Budget' : `Limit: $${trip.budgetLimit}`}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="trip-card-actions">
          <Link
            to={`/planner/${trip.id}`}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            View Trip
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onEdit(trip)}
            aria-label={`Edit ${trip.name}`}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(trip)}
            aria-label={`Delete ${trip.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
