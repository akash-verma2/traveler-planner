// Budget & Date calculation utilities for TravelPlanner

/**
 * Calculate the number of days between two date strings (inclusive)
 * @param {string} startDateStr - YYYY-MM-DD
 * @param {string} endDateStr - YYYY-MM-DD
 * @returns {number} Minimum 1
 */
export function calculateTripDays(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 1;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  
  // Calculate difference in milliseconds, convert to days (inclusive)
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Format a date string into a readable format (e.g., "Jun 10, 2025")
 * @param {string} dateStr 
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get the calendar date for a specific day number in the trip
 * @param {string} startDateStr - YYYY-MM-DD
 * @param {number} dayNumber - 1-based day number
 * @returns {string} e.g. "June 10"
 */
export function getDayDateString(startDateStr, dayNumber = 1) {
  if (!startDateStr) return `Day ${dayNumber}`;
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) return `Day ${dayNumber}`;
  
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + (dayNumber - 1));
  
  return targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculate comprehensive budget breakdown for a trip
 * @param {Object} trip - The trip object containing destination, dates, travelers, activities, budgetLimit
 * @param {Object} destination - Destination details object
 * @returns {Object} Full budget details
 */
export function calculateTripBudget(trip, destination) {
  const days = calculateTripDays(trip?.startDate, trip?.endDate);
  const travelers = Number(trip?.travelers) || 1;
  const activities = trip?.activities || [];
  
  // Base daily costs from destination data (per traveler per day)
  const dailyAccommodation = destination ? Number(destination.accommodation) || 0 : 0;
  const dailyFood = destination ? Number(destination.food) || 0 : 0;
  const dailyTransport = destination ? Number(destination.transport) || 0 : 0;
  
  // Estimated base totals
  const totalAccommodation = dailyAccommodation * days * travelers;
  const totalFood = dailyFood * days * travelers;
  const totalTransport = dailyTransport * days * travelers;
  const baseDestinationTotal = totalAccommodation + totalFood + totalTransport;

  // Breakdown of activities by category
  let activitiesCost = 0;
  let shoppingCost = 0;
  let otherCost = 0;
  let extraFoodCost = 0;
  let extraTransportCost = 0;

  activities.forEach(activity => {
    const cost = Number(activity.cost) || 0;
    const cat = activity.category?.toLowerCase() || '';

    if (cat === 'shopping') {
      shoppingCost += cost;
    } else if (cat === 'food') {
      extraFoodCost += cost;
    } else if (cat === 'transport') {
      extraTransportCost += cost;
    } else if (cat === 'other') {
      otherCost += cost;
    } else {
      // Sightseeing, Entertainment, Relaxation
      activitiesCost += cost;
    }
  });

  const totalActivitiesOnly = activities.reduce((sum, act) => sum + (Number(act.cost) || 0), 0);

  // Grouped display categories matching user specification:
  // Accommodation, Food, Transportation, Activities, Shopping, Other
  const budgetBreakdown = {
    accommodation: totalAccommodation,
    food: totalFood + extraFoodCost,
    transportation: totalTransport + extraTransportCost,
    activities: activitiesCost,
    shopping: shoppingCost,
    other: otherCost
  };

  const grandTotal = 
    budgetBreakdown.accommodation +
    budgetBreakdown.food +
    budgetBreakdown.transportation +
    budgetBreakdown.activities +
    budgetBreakdown.shopping +
    budgetBreakdown.other;

  const budgetLimit = Number(trip?.budgetLimit) || 0;
  const remaining = budgetLimit > 0 ? budgetLimit - grandTotal : 0;
  const percentage = budgetLimit > 0 ? Math.min(Math.round((grandTotal / budgetLimit) * 100), 200) : 0;
  const isOverBudget = budgetLimit > 0 && grandTotal > budgetLimit;

  return {
    days,
    travelers,
    dailyAccommodation,
    dailyFood,
    dailyTransport,
    totalAccommodation,
    totalFood,
    totalTransport,
    baseDestinationTotal,
    totalActivitiesOnly,
    budgetBreakdown,
    grandTotal,
    budgetLimit,
    remaining,
    percentage,
    isOverBudget
  };
}
