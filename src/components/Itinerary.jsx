import React from 'react';
import DayCard from './DayCard';
import { getDayDateString } from '../utils/budget';

/**
 * Itinerary - Day-by-day itinerary container rendering day cards
 */
export default function Itinerary({
  totalDays,
  startDate,
  activities = [],
  onAddActivity,
  onEditActivity,
  onDeleteActivity
}) {
  const daysArray = Array.from({ length: Math.max(1, totalDays) }, (_, i) => i + 1);

  return (
    <div className="itinerary-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem' }}>Day-by-Day Itinerary</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Plan your schedule, track timings, and map out attraction costs.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onAddActivity(1)}
        >
          + Add Activity
        </button>
      </div>

      {daysArray.map((dayNum) => {
        const dayActivities = activities.filter((a) => Number(a.day) === dayNum);
        const calendarDate = getDayDateString(startDate, dayNum);

        return (
          <DayCard
            key={dayNum}
            dayNumber={dayNum}
            calendarDate={calendarDate}
            activities={dayActivities}
            onAddActivity={onAddActivity}
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
          />
        );
      })}
    </div>
  );
}
