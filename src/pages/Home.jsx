import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import { DESTINATIONS, CATEGORIES } from '../data/destinations';

/**
 * Category emoji icon mapping for visual appeal
 */
const CATEGORY_ICONS = {
  Beach: '🏖️',
  Mountains: '⛰️',
  City: '🌆',
  Adventure: '🧗',
  Nature: '🌿',
  Cultural: '🏛️',
  Luxury: '💎',
  Budget: '💰'
};

/**
 * Home Page Component
 */
export default function Home({ favorites, onToggleFavorite, onOpenPlanModal }) {
  const navigate = useNavigate();

  // Show first 6 destinations for Popular Destinations section
  const popularDestinations = DESTINATIONS.slice(0, 6);

  const handleCategoryClick = (category) => {
    navigate(`/destinations?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Travel Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Explore by Travel Style</h2>
            <p className="section-subtitle">
              Whether you crave mountain heights, tropical beaches, or vibrant urban culture, find your perfect trip.
            </p>
          </div>

          <div className="category-chips-wrapper">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className="category-chip"
                onClick={() => handleCategoryClick(cat)}
              >
                <span>{CATEGORY_ICONS[cat] || '✈️'}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Destinations */}
      <section className="page-container container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">
              Hand-picked world wonders loved by global travelers
            </p>
          </div>
          <Link to="/destinations" className="btn btn-secondary">
            View All ({DESTINATIONS.length}) →
          </Link>
        </div>

        <div className="destination-grid">
          {popularDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isFavorited={favorites.includes(dest.id)}
              onToggleFavorite={onToggleFavorite}
              onPlanTrip={() => onOpenPlanModal(dest.id)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/destinations" className="btn btn-lg btn-primary">
            Explore All {DESTINATIONS.length} Destinations
          </Link>
        </div>

        {/* 4. Call to Action Banner */}
        <div className="cta-banner">
          <h2>Ready to plan your next adventure?</h2>
          <p>
            Create your personalized trip, schedule daily sightseeing activities, and let our smart calculator keep your budget safe.
          </p>
          <button
            type="button"
            className="btn btn-lg btn-accent"
            onClick={() => onOpenPlanModal()}
          >
            Create Your Trip
          </button>
        </div>
      </section>
    </div>
  );
}
