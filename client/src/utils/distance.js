export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        reject
      );
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
};
