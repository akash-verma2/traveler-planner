import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS, FALLBACK_IMAGE } from '../data/destinations';
import EmptyState from '../components/EmptyState';

/**
 * Destination Details Page - Comprehensive overview of attractions, budget breakdown, and travel tips
 */
export default function DestinationDetails({ favorites, onToggleFavorite, onOpenPlanModal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = DESTINATIONS.find((d) => String(d.id) === String(id));

  if (!destination) {
    return (
      <div className="page-container container">
        <EmptyState
          title="Destination Not Found"
          message="The destination you are looking for does not exist or may have been removed."
          icon="📍"
          actionLabel="Back to Destinations"
          actionLink="/destinations"
        />
      </div>
    );
  }

  const isFavorited = favorites.includes(destination.id);

  return (
    <div className="destination-details-page page-container">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> &gt;{' '}
          <Link to="/destinations" style={{ color: 'var(--primary)' }}>Destinations</Link> &gt;{' '}
          <span>{destination.name}</span>
        </nav>

        {/* Large Hero Banner */}
        <div className="destination-hero-banner">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            className="destination-hero-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
          <div className="destination-hero-overlay">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-accent">{destination.region}</span>
              {destination.categories?.map((cat) => (
                <span key={cat} className="badge badge-primary">
                  {cat}
                </span>
              ))}
            </div>

            <div>
              <h1 style={{ color: 'white', fontSize: '2.8rem', marginBottom: '0.25rem' }}>
                {destination.name}
              </h1>
              <p style={{ color: '#e2e8f0', fontSize: '1.25rem' }}>
                📍 {destination.country}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid: Left Content, Right Sticky Sidebar */}
        <div className="destination-details-layout">
          {/* Main Info */}
          <div className="details-main-column">
            {/* Overview & About */}
            <div className="details-content-card">
              <h3><span>📖</span> About {destination.name}</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                {destination.description}
              </p>

              <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🌤️</span>
                <div>
                  <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Best Time to Visit
                  </strong>
                  <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {destination.bestTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Budget Breakdown */}
            <div className="details-content-card">
              <h3><span>💳</span> Daily Budget Breakdown (Per Traveler)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Estimated average daily costs to help you budget accommodation, dining, and transit.
              </p>

              <div className="stats-budget-grid">
                <div className="stat-box">
                  <div className="stat-box-title">Daily Average</div>
                  <div className="stat-box-val">${destination.dailyBudget}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Total / day</span>
                </div>

                <div className="stat-box">
                  <div className="stat-box-title">Hotel / Stay</div>
                  <div className="stat-box-val">${destination.accommodation}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Approx. / night</span>
                </div>

                <div className="stat-box">
                  <div className="stat-box-title">Food & Dining</div>
                  <div className="stat-box-val">${destination.food}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>3 meals / day</span>
                </div>

                <div className="stat-box">
                  <div className="stat-box-title">Transport</div>
                  <div className="stat-box-val">${destination.transport}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Metro / Taxis</span>
                </div>
              </div>
            </div>

            {/* Popular Attractions */}
            <div className="details-content-card">
              <h3><span>🏛️</span> Top Attractions & Landmarks</h3>
              <ul className="attractions-list">
                {destination.attractions?.map((attr, idx) => (
                  <li key={idx} className="attraction-item">
                    <span className="attraction-icon">✓</span>
                    <span>{attr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Tips */}
            {destination.travelTips && (
              <div className="details-content-card">
                <h3><span>💡</span> Local Insider Travel Tips</h3>
                <ul className="travel-tips-list">
                  {destination.travelTips.map((tip, idx) => (
                    <li key={idx} className="travel-tip-item">
                      <span>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Actions */}
          <aside className="sticky-sidebar">
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Estimated Daily Rate
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                ${destination.dailyBudget} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ day</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                Based on typical comfortable traveler spend
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                style={{ width: '100%' }}
                onClick={() => onOpenPlanModal(destination.id)}
              >
                + Add to Trip
              </button>

              <button
                type="button"
                className={`btn btn-lg ${isFavorited ? 'btn-danger' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                onClick={() => onToggleFavorite(destination.id)}
              >
                <span style={{ fontSize: '1.2rem' }}>{isFavorited ? '♥' : '♡'}</span>
                {isFavorited ? 'Saved in Favorites' : 'Add to Favorites'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => navigate('/destinations')}
              >
                ← Back to Destinations
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
