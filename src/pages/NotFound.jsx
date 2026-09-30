import React from 'react';
import EmptyState from '../components/EmptyState';

/**
 * 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="not-found-page page-container container">
      <EmptyState
        title="Page not found"
        message="The page you are looking for doesn't exist, has been removed, or is temporarily unavailable."
        icon="🧭"
        actionLabel="Return to Home"
        actionLink="/"
      />
    </div>
  );
}
