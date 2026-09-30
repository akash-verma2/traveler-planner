import React from 'react';
import DestinationGrid from '../components/DestinationGrid';
import { DESTINATIONS } from '../data/destinations';

/**
 * Favorites Page - Displays all user-saved destinations with persistent localStorage
 */
export default function Favorites({ favorites = [], onToggleFavorite, onOpenPlanModal }) {
  const favoriteDestinations = DESTINATIONS.filter((d) => favorites.includes(d.id));

  return (
    <div className="favorites-page page-container">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Saved Destinations</h1>
          <p className="section-subtitle">
            Your personal collection of travel bucket list destinations.
          </p>
        </div>

        <DestinationGrid
          destinations={favoriteDestinations}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onPlanTrip={(dest) => onOpenPlanModal(dest.id)}
          emptyTitle="You haven't saved any destinations yet."
          emptyMessage="Explore the world catalog and tap the heart icon on any destination to save it here."
          emptyActionLabel="Explore Destinations"
          emptyActionLink="/destinations"
        />
      </div>
    </div>
  );
}
