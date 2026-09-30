// LocalStorage utilities for TravelPlanner
// Safe, pure browser storage helpers

const FAVORITES_KEY = 'travelplanner_favorites';
const TRIPS_KEY = 'travelplanner_trips';

/**
 * Retrieve all favorite destination IDs from localStorage
 * @returns {number[]} Array of favorite destination IDs
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read favorites from localStorage:', error);
    return [];
  }
}

/**
 * Save favorite destination IDs array to localStorage
 * @param {number[]} favorites 
 */
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
}

/**
 * Toggle a destination's favorite status
 * @param {number} destinationId 
 * @returns {boolean} Whether the item is now favorited
 */
export function toggleFavorite(destinationId) {
  const current = getFavorites();
  const numericId = Number(destinationId);
  const exists = current.includes(numericId);
  const updated = exists
    ? current.filter(id => id !== numericId)
    : [...current, numericId];
  saveFavorites(updated);
  return !exists;
}

/**
 * Check if a destination is in favorites
 * @param {number} destinationId 
 * @returns {boolean}
 */
export function isFavorite(destinationId) {
  const current = getFavorites();
  return current.includes(Number(destinationId));
}

/**
 * Retrieve all trips from localStorage
 * @returns {Array} List of trip objects
 */
export function getTrips() {
  try {
    const data = localStorage.getItem(TRIPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read trips from localStorage:', error);
    return [];
  }
}

/**
 * Save trips array to localStorage
 * @param {Array} trips 
 */
export function saveTrips(trips) {
  try {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Failed to save trips to localStorage:', error);
  }
}

/**
 * Retrieve a single trip by ID
 * @param {string|number} tripId 
 * @returns {Object|null}
 */
export function getTripById(tripId) {
  const trips = getTrips();
  return trips.find(t => String(t.id) === String(tripId)) || null;
}

/**
 * Add or update a trip in localStorage
 * @param {Object} trip 
 * @returns {Object} The saved trip
 */
export function saveTrip(trip) {
  const trips = getTrips();
  const existingIndex = trips.findIndex(t => String(t.id) === String(trip.id));

  let updatedTrips;
  if (existingIndex >= 0) {
    // Update existing
    updatedTrips = [...trips];
    updatedTrips[existingIndex] = {
      ...updatedTrips[existingIndex],
      ...trip,
      updatedAt: new Date().toISOString()
    };
  } else {
    // Add new
    const newTrip = {
      ...trip,
      id: trip.id || `trip_${Date.now()}`,
      activities: trip.activities || [],
      budgetLimit: trip.budgetLimit || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    updatedTrips = [newTrip, ...trips];
  }

  saveTrips(updatedTrips);
  return getTripById(trip.id || updatedTrips[0].id);
}

/**
 * Delete a trip by ID
 * @param {string|number} tripId 
 */
export function deleteTrip(tripId) {
  const trips = getTrips();
  const filtered = trips.filter(t => String(t.id) !== String(tripId));
  saveTrips(filtered);
}
