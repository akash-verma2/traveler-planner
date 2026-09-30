import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Empty & Error State Component
 */
export default function EmptyState({
  title = "Nothing to see here",
  message = "There are no items to display at this time.",
  icon = "✈️",
  actionLabel,
  actionLink,
  onAction
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{message}</p>

      {actionLink ? (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      ) : actionLabel && onAction ? (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
