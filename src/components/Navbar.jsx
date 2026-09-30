import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Responsive Navbar with brand logo, links, favorite counter, and Plan Trip CTA
 */
export default function Navbar({ favoritesCount = 0, onOpenPlanModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="navbar-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
          <span>Travel<span className="brand-accent">Planner</span></span>
        </Link>

        {/* Desktop & Mobile Navigation Links */}
        <nav
          className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Main Navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/destinations"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Explore
          </NavLink>
          <NavLink
            to="/trips"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            My Trips
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Favorites
            {favoritesCount > 0 && (
              <span className="fav-badge-counter">{favoritesCount}</span>
            )}
          </NavLink>

          <button
            type="button"
            className="btn btn-primary mobile-plan-btn"
            style={{ display: mobileMenuOpen ? 'inline-flex' : 'none', marginTop: '0.5rem' }}
            onClick={() => {
              closeMobileMenu();
              onOpenPlanModal();
            }}
          >
            + Plan a Trip
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-primary btn-plan-header"
            onClick={onOpenPlanModal}
          >
            + Plan a Trip
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
