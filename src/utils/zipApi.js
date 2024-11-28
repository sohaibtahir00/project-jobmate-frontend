const fetchLocationByZip = async (zipCode) => {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
    if (!response.ok) {
      throw new Error("Invalid ZIP code or not found.");
    }
    const data = await response.json();
    const formattedLocation = `${data.places[0]["place name"]}, ${data.places[0]["state abbreviation"]}, ${data.country}`;
    return formattedLocation;
  } catch (error) {
    console.error("Error fetching location by ZIP:", error);
    return "Invalid ZIP code. Try again.";
  }
};

export default fetchLocationByZip;
