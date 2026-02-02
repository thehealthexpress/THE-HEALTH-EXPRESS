const haversine = require('haversine-distance');

function calculateDistance(userLat, userLng, restLat, restLng) {
  const userPoint = { lat: userLat, lng: userLng };
  const restPoint = { lat: restLat, lng: restLng };
  return haversine(userPoint, restPoint) / 1000; // In km
}

module.exports = { calculateDistance };
