import React from 'react';
import ActivityCard from './ActivityCard';

/**
 * DayCard - Represents a single day in the trip itinerary
 */
export default function DayCard({
  dayNumber,
  calendarDate,
  activities = [],
  onAddActivity,
  onEditActivity,
  onDeleteActivity
}) {
  // Sort activities chronologically by time
  const sortedActivities = [...activities].sort((a, b) => {
    return (a.time || '').localeCompare(b.time || '');
  });

  const dayTotalCost = sortedActivities.reduce((sum, act) => sum + (Number(act.cost) || 0), 0);

  return (
    <div className="day-card">
      <div className="day-card-header">
        <div className="day-title-group">
          <span className="day-tag">DAY {dayNumber}</span>
          <span className="day-date-label">{calendarDate}</span>
          <span className="day-summary-text">
            • {sortedActivities.length} {sortedActivities.length === 1 ? 'activity' : 'activities'}
            {dayTotalCost > 0 && ` • $${dayTotalCost.toLocaleString()} spent`}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => onAddActivity(dayNumber)}
        >
          + Add Activity
        </button>
      </div>

      <div className="day-activities-list">
        {sortedActivities.length === 0 ? (
          <div className="no-activities-day">
            <p>No activities scheduled for Day {dayNumber} yet.</p>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              style={{ marginTop: '0.65rem' }}
              onClick={() => onAddActivity(dayNumber)}
            >
              Schedule an activity
            </button>
          </div>
        ) : (
          sortedActivities.map((act) => (
            <ActivityCard
              key={act.id}
              activity={act}
              onEdit={onEditActivity}
              onDelete={onDeleteActivity}
            />
          ))
        )}
      </div>
    </div>
  );
}
