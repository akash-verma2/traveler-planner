import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

/**
 * Hero Section with dynamic destination search
 */
export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-tag">
          <span>✨</span> Smart & Effortless Travel Planning
        </div>

        <h1 className="hero-title">
          Plan Your Next <span className="highlight">Adventure</span>
        </h1>

        <p className="hero-subtitle">
          Discover amazing destinations, organize your itinerary, and manage your travel budget in one place.
        </p>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
          placeholder="Search destinations (e.g. Paris, Bali, Tokyo, Beach)..."
        />
      </div>
    </section>
  );
}
