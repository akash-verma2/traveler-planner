import React from 'react';

/**
 * Helper to display time cleanly (converts "14:30" to "02:30 PM", or keeps string if already formatted)
 */
function formatTime(timeStr) {
  if (!timeStr) return '--:--';
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;

  const [hours, minutes] = timeStr.split(':');
  if (hours !== undefined && minutes !== undefined) {
    const h = parseInt(hours, 10);
    const m = minutes.padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${String(formattedHour).padStart(2, '0')}:${m} ${ampm}`;
  }
  return timeStr;
}

/**
 * ActivityCard - Renders an individual scheduled activity within a day
 */
export default function ActivityCard({ activity, onEdit, onDelete }) {
  if (!activity) return null;

  const categoryColorClass = (() => {
    switch (activity.category?.toLowerCase()) {
      case 'sightseeing': return 'badge-primary';
      case 'food': return 'badge-accent';
      case 'entertainment': return 'badge-primary';
      case 'transport': return 'badge-subtle';
      case 'relaxation': return 'badge-primary';
      default: return 'badge-subtle';
    }
  })();

  return (
    <div className="activity-card">
      <div className="activity-time-badge">
        {formatTime(activity.time)}
      </div>

      <div className="activity-info">
        <h4 className="activity-title">{activity.title}</h4>
        <div className="activity-meta">
          <span className={`badge ${categoryColorClass}`}>
            {activity.category || 'Activity'}
          </span>
          <span className="activity-cost-badge">
            ${Number(activity.cost || 0)}
          </span>
        </div>
        {activity.notes && (
          <p className="activity-notes-text">
            "{activity.notes}"
          </p>
        )}
      </div>

      <div className="activity-actions">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => onEdit(activity)}
          aria-label={`Edit ${activity.title}`}
          title="Edit activity"
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(activity)}
          aria-label={`Delete ${activity.title}`}
          title="Delete activity"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
