import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/FilterPanel';
import DestinationGrid from '../components/DestinationGrid';
import { DESTINATIONS } from '../data/destinations';

/**
 * Destinations Page - Explore with search, multi-criteria filtering, and sorting
 */
export default function Destinations({ favorites, onToggleFavorite, onOpenPlanModal }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL search params if present
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBudget, setSelectedBudget] = useState(searchParams.get('budget') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  // Keep state synchronized with URL search params changes
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    const urlRegion = searchParams.get('region');
    const urlBudget = searchParams.get('budget');

    if (urlSearch !== null) setSearchTerm(urlSearch);
    if (urlCategory !== null) setSelectedCategory(urlCategory);
    if (urlRegion !== null) setSelectedRegion(urlRegion);
    if (urlBudget !== null) setSelectedBudget(urlBudget);
  }, [searchParams]);

  // Reset all filters back to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All');
    setSelectedCategory('All');
    setSelectedBudget('all');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter and sort destination data using useMemo for performance
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // 1. Text Search: checks Name, Country, Region, and Categories
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesCountry = dest.country.toLowerCase().includes(query);
        const matchesRegion = dest.region.toLowerCase().includes(query);
        const matchesCategory = dest.categories.some((c) => c.toLowerCase().includes(query));

        if (!matchesName && !matchesCountry && !matchesRegion && !matchesCategory) {
          return false;
        }
      }

      // 2. Region filter
      if (selectedRegion !== 'All') {
        if (dest.region.toLowerCase() !== selectedRegion.toLowerCase()) {
          return false;
        }
      }

      // 3. Category filter
      if (selectedCategory !== 'All') {
        const hasCategory = dest.categories.some((c) =>
          c.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasCategory) return false;
      }

      // 4. Budget filter
      if (selectedBudget === 'budget') {
        if (dest.dailyBudget >= 80) return false;
      } else if (selectedBudget === 'moderate') {
        if (dest.dailyBudget < 80 || dest.dailyBudget > 150) return false;
      } else if (selectedBudget === 'luxury') {
        if (dest.dailyBudget <= 150) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'budget-low':
          return a.dailyBudget - b.dailyBudget;
        case 'budget-high':
          return b.dailyBudget - a.dailyBudget;
        case 'popular':
        default:
          return a.id - b.id;
      }
    });
  }, [searchTerm, selectedRegion, selectedCategory, selectedBudget, sortBy]);

  return (
    <div className="destinations-page page-container">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Explore Destinations</h1>
          <p className="section-subtitle">
            Find the perfect spot for your next trip, filter by budget, region, or travel style.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <FilterPanel
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBudget={selectedBudget}
          onBudgetChange={setSelectedBudget}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredDestinations.length}
          maxResults={DESTINATIONS.length}
        />

        {/* Destination Grid & Empty State */}
        <DestinationGrid
          destinations={filteredDestinations}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onPlanTrip={(dest) => onOpenPlanModal(dest.id)}
          emptyTitle="No destinations found"
          emptyMessage="No destinations found. Try changing your search or filters."
          emptyActionLabel="Reset Filters"
          onEmptyAction={handleResetFilters}
        />
      </div>
    </div>
  );
}
