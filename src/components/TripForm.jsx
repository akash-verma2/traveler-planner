import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';

/**
 * TripForm - Modal form for creating or editing trips with robust validation
 */
export default function TripForm({
  isOpen,
  onClose,
  onSubmit,
  initialTrip = null,
  preselectedDestinationId = null
}) {
  const [name, setName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [budgetLimit, setBudgetLimit] = useState('');
  const [errors, setErrors] = useState({});

  // Reset or fill form when opening or changing initialTrip
  useEffect(() => {
    if (isOpen) {
      if (initialTrip) {
        setName(initialTrip.name || '');
        setDestinationId(String(initialTrip.destinationId || ''));
        setStartDate(initialTrip.startDate || '');
        setEndDate(initialTrip.endDate || '');
        setTravelers(initialTrip.travelers || 1);
        setBudgetLimit(initialTrip.budgetLimit ? String(initialTrip.budgetLimit) : '');
      } else {
        // Today and 5 days from now defaults
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 4);

        const formatDateIso = (d) => d.toISOString().split('T')[0];

        setName('');
        setDestinationId(preselectedDestinationId ? String(preselectedDestinationId) : '');
        setStartDate(formatDateIso(today));
        setEndDate(formatDateIso(nextWeek));
        setTravelers(1);
        setBudgetLimit('');
      }
      setErrors({});
    }
  }, [isOpen, initialTrip, preselectedDestinationId]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Trip name is required';
    }

    if (!destinationId) {
      newErrors.destinationId = 'Please select a destination';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    } else if (startDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = 'End date must be after or equal to the start date';
    }

    if (!travelers || Number(travelers) < 1) {
      newErrors.travelers = 'Travelers must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedDest = DESTINATIONS.find((d) => String(d.id) === String(destinationId));

    const tripData = {
      ...(initialTrip || {}),
      name: name.trim(),
      destinationId: Number(destinationId),
      destinationName: selectedDest ? `${selectedDest.name}, ${selectedDest.country}` : '',
      startDate,
      endDate,
      travelers: Math.max(1, parseInt(travelers, 10) || 1),
      budgetLimit: budgetLimit ? Math.max(0, parseFloat(budgetLimit) || 0) : 0
    };

    onSubmit(tripData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialTrip ? 'Edit Trip' : 'Create a New Trip'}</h3>
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
            {/* Trip Name */}
            <div className="form-group">
              <label htmlFor="trip-name" className="form-label">
                Trip Name *
              </label>
              <input
                id="trip-name"
                type="text"
                className="form-input"
                placeholder="e.g. Summer in Paris, Tokyo Discovery"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            {/* Destination Dropdown */}
            <div className="form-group">
              <label htmlFor="trip-destination" className="form-label">
                Destination *
              </label>
              <select
                id="trip-destination"
                className="form-select"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                <option value="">Select a Destination...</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country} ({d.region})
                  </option>
                ))}
              </select>
              {errors.destinationId && <p className="form-error">{errors.destinationId}</p>}
            </div>

            {/* Dates row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="start-date" className="form-label">
                  Start Date *
                </label>
                <input
                  id="start-date"
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {errors.startDate && <p className="form-error">{errors.startDate}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="end-date" className="form-label">
                  End Date *
                </label>
                <input
                  id="end-date"
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {errors.endDate && <p className="form-error">{errors.endDate}</p>}
              </div>
            </div>

            {/* Travelers & Optional Budget Limit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="trip-travelers" className="form-label">
                  Number of Travelers *
                </label>
                <input
                  id="trip-travelers"
                  type="number"
                  min="1"
                  max="50"
                  className="form-input"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                />
                {errors.travelers && <p className="form-error">{errors.travelers}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="budget-limit" className="form-label">
                  Target Budget Limit ($)
                </label>
                <input
                  id="budget-limit"
                  type="number"
                  min="0"
                  step="50"
                  placeholder="e.g. 2000"
                  className="form-input"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialTrip ? 'Save Changes' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
