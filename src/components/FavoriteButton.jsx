import React from 'react';

/**
 * Reusable Favorite Heart Button
 * Toggles a destination's saved state
 */
export default function FavoriteButton({ isFavorited, onToggle, className = '' }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      type="button"
      className={`card-favorite-btn ${isFavorited ? 'favorited' : ''} ${className}`}
      onClick={handleClick}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      title={isFavorited ? "Remove from favorites" : "Save to favorites"}
    >
      <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>
        {isFavorited ? '♥' : '♡'}
      </span>
    </button>
  );
}
