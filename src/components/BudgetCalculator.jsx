import React, { useState } from 'react';
import { calculateTripBudget } from '../utils/budget';

/**
 * BudgetCalculator - Dynamic budget breakdown, formula explainer, and limit progress tracker
 */
export default function BudgetCalculator({ trip, destination, onUpdateBudgetLimit }) {
  const budgetInfo = calculateTripBudget(trip, destination);
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [limitInput, setLimitInput] = useState(trip?.budgetLimit ? String(trip.budgetLimit) : '');

  const handleSaveLimit = (e) => {
    e.preventDefault();
    const newLimit = Math.max(0, parseFloat(limitInput) || 0);
    onUpdateBudgetLimit(newLimit);
    setIsEditingLimit(false);
  };

  const getProgressColorClass = () => {
    if (budgetInfo.percentage > 100) return 'danger';
    if (budgetInfo.percentage >= 80) return 'warning';
    return 'normal';
  };

  return (
    <aside className="budget-calculator-card" aria-label="Trip Budget Calculator">
      <h3>
        <span>💰</span> Budget Calculator
      </h3>

      {/* Categories Breakdown Table */}
      <table className="budget-rows-table">
        <tbody>
          <tr>
            <td>Accommodation</td>
            <td>${budgetInfo.budgetBreakdown.accommodation.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>${budgetInfo.budgetBreakdown.food.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>${budgetInfo.budgetBreakdown.transportation.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Activities</td>
            <td>${budgetInfo.budgetBreakdown.activities.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>${budgetInfo.budgetBreakdown.shopping.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>${budgetInfo.budgetBreakdown.other.toLocaleString()}</td>
          </tr>
          <tr className="budget-total-row">
            <td>Total Estimated Cost</td>
            <td>${budgetInfo.grandTotal.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      {/* Formula Explanation Callout */}
      <div className="budget-formula-explainer">
        <strong>Calculation Formula:</strong>
        <p style={{ marginTop: '0.25rem' }}>
          Base costs (${budgetInfo.dailyAccommodation} hotel + ${budgetInfo.dailyFood} food + ${budgetInfo.dailyTransport} transit)
          × {budgetInfo.days} days × {budgetInfo.travelers} {budgetInfo.travelers === 1 ? 'traveler' : 'travelers'} = <strong>${budgetInfo.baseDestinationTotal.toLocaleString()}</strong>
          {budgetInfo.totalActivitiesOnly > 0 && ` + scheduled activities ($${budgetInfo.totalActivitiesOnly.toLocaleString()})`}
        </p>
      </div>

      {/* Budget Limit Tracker */}
      <div className="budget-limit-control">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Budget Limit
          </span>

          {!isEditingLimit ? (
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setLimitInput(trip?.budgetLimit ? String(trip.budgetLimit) : '');
                setIsEditingLimit(true);
              }}
              style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}
            >
              {trip?.budgetLimit > 0 ? 'Edit Limit' : '+ Set Limit'}
            </button>
          ) : null}
        </div>

        {isEditingLimit ? (
          <form onSubmit={handleSaveLimit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="number"
              min="0"
              step="50"
              className="form-input"
              style={{ padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
              placeholder="e.g. 2500"
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-sm btn-primary">Save</button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditingLimit(false)}
            >
              ✕
            </button>
          </form>
        ) : (
          <div>
            {budgetInfo.budgetLimit > 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Limit: <strong>${budgetInfo.budgetLimit.toLocaleString()}</strong></span>
                  <span>Spent: <strong>${budgetInfo.grandTotal.toLocaleString()}</strong></span>
                </div>

                {/* Progress bar */}
                <div className="progress-track" role="progressbar" aria-valuenow={budgetInfo.percentage} aria-valuemin="0" aria-valuemax="100">
                  <div
                    className={`progress-bar-fill ${getProgressColorClass()}`}
                    style={{ width: `${Math.min(budgetInfo.percentage, 100)}%` }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 700, color: budgetInfo.isOverBudget ? 'var(--danger)' : 'var(--text-main)' }}>
                    {budgetInfo.percentage}% Used
                  </span>
                  <span>
                    {budgetInfo.isOverBudget ? (
                      <strong style={{ color: 'var(--danger)' }}>
                        Over by ${(budgetInfo.grandTotal - budgetInfo.budgetLimit).toLocaleString()}
                      </strong>
                    ) : (
                      <span style={{ color: 'var(--success)' }}>
                        ${budgetInfo.remaining.toLocaleString()} remaining
                      </span>
                    )}
                  </span>
                </div>

                {budgetInfo.isOverBudget ? (
                  <div className="budget-status-alert over">
                    <span>⚠</span> You are over your budget!
                  </div>
                ) : (
                  <div className="budget-status-alert good">
                    <span>✓</span> Within target budget limit.
                  </div>
                )}
              </>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                No budget limit set. Click "+ Set Limit" to track spending goals.
              </p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
