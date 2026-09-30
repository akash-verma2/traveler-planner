import React from 'react';
import { REGIONS, CATEGORIES, BUDGET_RANGES } from '../data/destinations';

/**
 * FilterPanel - Multi-criteria filter and sort controls for destinations
 */
export default function FilterPanel({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  selectedBudget,
  onBudgetChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResults = 0,
  maxResults = 0
}) {
  const isFiltered =
    searchTerm.trim() !== '' ||
    selectedRegion !== 'All' ||
    selectedCategory !== 'All' ||
    selectedBudget !== 'all' ||
    sortBy !== 'popular';

  return (
    <section className="filter-panel" aria-label="Destination filters">
      <div className="filter-grid">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search-input" className="filter-label">Search Destinations</label>
          <div className="filter-input-wrapper">
            <input
              id="search-input"
              type="text"
              className="filter-input"
              placeholder="Search by city, country, region, or style..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="filter-group">
          <label htmlFor="region-select" className="filter-label">Region</label>
          <select
            id="region-select"
            className="filter-select"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region === 'All' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category-select" className="filter-label">Category</label>
          <select
            id="category-select"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div className="filter-group">
          <label htmlFor="budget-select" className="filter-label">Daily Budget</label>
          <select
            id="budget-select"
            className="filter-select"
            value={selectedBudget}
            onChange={(e) => onBudgetChange(e.target.value)}
          >
            {BUDGET_RANGES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter summary bar & Sort Controls */}
      <div className="filter-actions-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Showing <strong>{totalResults}</strong> of {maxResults} destinations
          </span>

          {isFiltered && (
            <div className="active-filters-list">
              {searchTerm && (
                <span className="active-filter-tag">
                  "{searchTerm}"
                  <button
                    type="button"
                    className="remove-filter-btn"
                    onClick={() => onSearchChange('')}
                    aria-label="Remove search term"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedRegion !== 'All' && (
                <span className="active-filter-tag">
                  {selectedRegion}
                  <button
                    type="button"
                    className="remove-filter-btn"
                    onClick={() => onRegionChange('All')}
                    aria-label="Remove region filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="active-filter-tag">
                  {selectedCategory}
                  <button
                    type="button"
                    className="remove-filter-btn"
                    onClick={() => onCategoryChange('All')}
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedBudget !== 'all' && (
                <span className="active-filter-tag">
                  Budget: {selectedBudget}
                  <button
                    type="button"
                    className="remove-filter-btn"
                    onClick={() => onBudgetChange('all')}
                    aria-label="Remove budget filter"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onResetFilters}
                style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="sort-select" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Sort by:
          </label>
          <select
            id="sort-select"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.88rem' }}
          >
            <option value="popular">Popular (Default)</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="budget-low">Lowest Budget</option>
            <option value="budget-high">Highest Budget</option>
          </select>
        </div>
      </div>
    </section>
  );
}
