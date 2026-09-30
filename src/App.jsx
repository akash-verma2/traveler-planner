import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TripForm from './components/TripForm';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Favorites from './pages/Favorites';
import Trips from './pages/Trips';
import TripPlanner from './pages/TripPlanner';
import NotFound from './pages/NotFound';

// Utils
import {
  getFavorites,
  saveFavorites,
  getTrips,
  saveTrips,
  saveTrip,
  deleteTrip
} from './utils/storage';

export default function App() {
  const navigate = useNavigate();

  // 1. Persistent Favorites State
  const [favorites, setFavorites] = useState(() => getFavorites());

  // 2. Persistent Trips State
  const [trips, setTrips] = useState(() => getTrips());

  // 3. Trip Modal State (For Creating or Editing a Trip)
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [preselectedDestId, setPreselectedDestId] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);

  // Sync favorites changes to localStorage
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Sync trips changes to localStorage
  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  // Toggle favorite destination handler
  const handleToggleFavorite = (destinationId) => {
    const numericId = Number(destinationId);
    setFavorites((prev) => {
      const exists = prev.includes(numericId);
      if (exists) {
        return prev.filter((id) => id !== numericId);
      } else {
        return [...prev, numericId];
      }
    });
  };

  // Open Trip Creation Modal
  const handleOpenPlanModal = (destinationId = null) => {
    setEditingTrip(null);
    setPreselectedDestId(destinationId);
    setIsTripModalOpen(true);
  };

  // Open Trip Edit Modal
  const handleOpenEditTripModal = (trip) => {
    setPreselectedDestId(null);
    setEditingTrip(trip);
    setIsTripModalOpen(true);
  };

  // Handle Save (Create or Update) Trip from Modal
  const handleSaveTrip = (tripData) => {
    const saved = saveTrip(tripData);
    setTrips(getTrips());
    setIsTripModalOpen(false);
    setEditingTrip(null);
    setPreselectedDestId(null);

    // Redirect to Trip Planner upon creation or update
    if (saved && saved.id) {
      navigate(`/planner/${saved.id}`);
    }
  };

  // Handle Delete Trip
  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
    setTrips(getTrips());
  };

  // Handle In-Place Trip Update (e.g., adding/editing activities, changing budget limit in Planner)
  const handleUpdateTrip = (updatedTrip) => {
    saveTrip(updatedTrip);
    setTrips(getTrips());
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenPlanModal={() => handleOpenPlanModal()}
      />

      {/* Main Routed Content */}
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenPlanModal={handleOpenPlanModal}
              />
            }
          />
          <Route
            path="/destinations"
            element={
              <Destinations
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenPlanModal={handleOpenPlanModal}
              />
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <DestinationDetails
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenPlanModal={handleOpenPlanModal}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenPlanModal={handleOpenPlanModal}
              />
            }
          />
          <Route
            path="/trips"
            element={
              <Trips
                trips={trips}
                onEditTrip={handleOpenEditTripModal}
                onDeleteTrip={handleDeleteTrip}
                onOpenPlanModal={handleOpenPlanModal}
              />
            }
          />
          <Route
            path="/planner/:tripId"
            element={
              <TripPlanner
                trips={trips}
                onUpdateTrip={handleUpdateTrip}
                onEditTripModal={handleOpenEditTripModal}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Create / Edit Trip Modal */}
      <TripForm
        isOpen={isTripModalOpen}
        onClose={() => {
          setIsTripModalOpen(false);
          setEditingTrip(null);
          setPreselectedDestId(null);
        }}
        onSubmit={handleSaveTrip}
        initialTrip={editingTrip}
        preselectedDestinationId={preselectedDestId}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
