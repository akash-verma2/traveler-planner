import React from 'react';
import DestinationCard from './DestinationCard';
import EmptyState from './EmptyState';

/**
 * DestinationGrid - Renders a responsive list or grid of DestinationCards
 */
export default function DestinationGrid({
  destinations = [],
  favorites = [],
  onToggleFavorite,
  onPlanTrip,
  emptyTitle = "No destinations found",
  emptyMessage = "Try changing your search or filters to discover new places.",
  emptyActionLabel,
  onEmptyAction
}) {
  if (!destinations || destinations.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
        icon="🗺️"
      />
    );
  }

  return (
    <div className="destination-grid">
      {destinations.map((destination) => {
        const isFavorited = favorites.includes(destination.id);
        return (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isFavorited={isFavorited}
            onToggleFavorite={onToggleFavorite}
            onPlanTrip={onPlanTrip}
          />
        );
      })}
    </div>
  );
}
