import React from 'react';

/**
 * Reusable SearchBar Component with instant input and search button
 */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search destinations by name, country, or category...",
  className = ""
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form className={`hero-search-wrapper ${className}`} onSubmit={handleSubmit} role="search">
      <span style={{ fontSize: '1.2rem', paddingLeft: '0.75rem', color: '#94a3b8' }}>
        🔍
      </span>
      <input
        type="text"
        className="hero-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search destinations"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{ background: 'none', border: 'none', padding: '0.5rem', color: '#94a3b8', fontSize: '1.1rem', cursor: 'pointer' }}
          aria-label="Clear search"
          title="Clear search"
        >
          ✕
        </button>
      )}
      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-lg)' }}>
        Explore
      </button>
    </form>
  );
}
