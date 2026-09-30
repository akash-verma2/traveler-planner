import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component with categories, links, and portfolio details
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h4>
              <span style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>✈</span> TravelPlanner
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Your ultimate companion for discovering global destinations, crafting custom day-by-day itineraries, and keeping vacation budgets strictly on track.
            </p>
            <span className="badge badge-primary" style={{ background: '#134e4a', color: '#5eead4' }}>
              100% Client-Side • LocalStorage Powered
            </span>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Explore Destinations</Link></li>
              <li><Link to="/trips">My Trips</Link></li>
              <li><Link to="/favorites">Saved Favorites</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h5>Popular Categories</h5>
            <ul className="footer-links">
              <li><Link to="/destinations?category=Beach">Beach Getaways</Link></li>
              <li><Link to="/destinations?category=Mountains">Mountain Escapes</Link></li>
              <li><Link to="/destinations?category=City">City Explorations</Link></li>
              <li><Link to="/destinations?category=Cultural">Cultural Heritage</Link></li>
              <li><Link to="/destinations?category=Budget">Budget Adventures</Link></li>
            </ul>
          </div>

          {/* Features / Tech Stack */}
          <div className="footer-col">
            <h5>Built With</h5>
            <ul className="footer-links">
              <li><span>React 18 & Vite</span></li>
              <li><span>React Router v6</span></li>
              <li><span>Vanilla CSS Variables</span></li>
              <li><span>Browser LocalStorage</span></li>
              <li><span>Zero External APIs Needed</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TravelPlanner. All rights reserved. Created for portfolio demonstration.</p>
          <p style={{ color: '#64748b' }}>Designed with clean aesthetics, accessibility, and smooth performance.</p>
        </div>
      </div>
    </footer>
  );
}
