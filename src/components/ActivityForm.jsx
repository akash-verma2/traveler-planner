import React, { useState, useEffect } from 'react';
import { ACTIVITY_CATEGORIES } from '../data/destinations';

/**
 * ActivityForm - Modal form for adding or editing an itinerary activity
 */
export default function ActivityForm({
  isOpen,
  onClose,
  onSubmit,
  initialActivity = null,
  totalDays = 1,
  defaultDay = 1
}) {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('09:00');
  const [category, setCategory] = useState('Sightseeing');
  const [cost, setCost] = useState('0');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialActivity) {
        setTitle(initialActivity.title || '');
        setDay(initialActivity.day || 1);
        setTime(initialActivity.time || '09:00');
        setCategory(initialActivity.category || 'Sightseeing');
        setCost(initialActivity.cost !== undefined ? String(initialActivity.cost) : '0');
        setNotes(initialActivity.notes || '');
      } else {
        setTitle('');
        setDay(defaultDay || 1);
        setTime('10:00');
        setCategory('Sightseeing');
        setCost('0');
        setNotes('');
      }
      setErrors({});
    }
  }, [isOpen, initialActivity, defaultDay]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Activity title is required';
    }
    if (!day || Number(day) < 1 || Number(day) > totalDays) {
      newErrors.day = `Day must be between 1 and ${totalDays}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const activityData = {
      id: initialActivity?.id || `act_${Date.now()}`,
      day: parseInt(day, 10),
      title: title.trim(),
      time: time || '12:00',
      category: category || 'Other',
      cost: Math.max(0, parseFloat(cost) || 0),
      notes: notes.trim()
    };

    onSubmit(activityData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialActivity ? 'Edit Activity' : 'Add Itinerary Activity'}</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="activity-title" className="form-label">
                Activity Title *
              </label>
              <input
                id="activity-title"
                type="text"
                className="form-input"
                placeholder="e.g. Visit Eiffel Tower, Lunch at sidewalk bistro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            {/* Day and Time Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="activity-day" className="form-label">
                  Day Number *
                </label>
                <select
                  id="activity-day"
                  className="form-select"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      Day {d}
                    </option>
                  ))}
                </select>
                {errors.day && <p className="form-error">{errors.day}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="activity-time" className="form-label">
                  Time
                </label>
                <input
                  id="activity-time"
                  type="time"
                  className="form-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* Category and Estimated Cost */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="activity-category" className="form-label">
                  Category
                </label>
                <select
                  id="activity-category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {ACTIVITY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="activity-cost" className="form-label">
                  Estimated Cost ($)
                </label>
                <input
                  id="activity-cost"
                  type="number"
                  min="0"
                  step="1"
                  className="form-input"
                  placeholder="0"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label htmlFor="activity-notes" className="form-label">
                Notes & Tips
              </label>
              <textarea
                id="activity-notes"
                className="form-textarea"
                placeholder="e.g. Book skip-the-line tickets 2 weeks in advance, bring camera"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialActivity ? 'Update Activity' : 'Add Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
