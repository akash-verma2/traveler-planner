import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { FALLBACK_IMAGE } from '../data/destinations';

/**
 * DestinationCard - Reusable card displaying summary of a travel destination
 */
export default function DestinationCard({ destination, isFavorited, onToggleFavorite, onPlanTrip }) {
  if (!destination) return null;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <article className="destination-card">
      <div className="destination-card-media">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="destination-card-img"
          loading="lazy"
          onError={handleImageError}
        />
        <span className="destination-card-region">{destination.region}</span>
        <FavoriteButton
          isFavorited={isFavorited}
          onToggle={() => onToggleFavorite(destination.id)}
        />
      </div>

      <div className="destination-card-body">
        <div className="card-header-line">
          <h3 className="destination-title">
            {destination.name}, <span className="destination-country">{destination.country}</span>
          </h3>
        </div>

        <div className="card-categories-row">
          {destination.categories?.map((cat) => (
            <span key={cat} className="badge badge-primary">
              {cat}
            </span>
          ))}
        </div>

        <p className="destination-card-desc">{destination.description}</p>

        <div className="card-footer-line">
          <div className="card-price-block">
            <span className="card-price-label">Estimated</span>
            <div className="card-price-amount">
              ${destination.dailyBudget} <span>/ day</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {onPlanTrip && (
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => onPlanTrip(destination)}
                title="Plan a trip to this destination"
              >
                + Trip
              </button>
            )}
            <Link
              to={`/destinations/${destination.id}`}
              className="btn btn-sm btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
