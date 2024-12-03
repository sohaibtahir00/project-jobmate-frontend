const getUserLocation = async () => {
  try {
    const response = await fetch("https://ipinfo.io/json?token=e3074b90b2da6b");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      city: data.city,
      region: data.region,
      country: data.country,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

export default getUserLocation;
