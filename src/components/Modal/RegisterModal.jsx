import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import getUserLocation from "../../utils/ipinfoApi";
import fetchLocationByZip from "../../utils/zipApi";

function RegisterModal({ activeModal, onClose, onRegister, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipLocation, setZipLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleZipCodeLookup = async () => {
    const locationResult = await fetchLocationByZip(zipCode);
    setZipLocation(locationResult);
    setLocation(locationResult);
  };

  const fetchUserLocation = async () => {
    try {
      const userLoc = await getUserLocation();
      if (userLoc) {
        const formattedLocation = `${userLoc.city}, ${userLoc.region}, ${userLoc.country}`;
        setLocation(formattedLocation);
      } else {
        setLocation("Unable to fetch location. Try again.");
      }
    } catch (error) {
      setLocation("Unable to fetch location. Try again.");
      console.error("Error fetching user location:", error);
    }
  };

  const handleToggleOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? "" : option));
    if (selectedOption === option) {
      setLocation("");
    }
  };

  useEffect(() => {
    if (selectedOption === "find") {
      fetchUserLocation();
    }
  }, [selectedOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, location: location || "None" };
    localStorage.setItem("userData", JSON.stringify(userData));
    onRegister(userData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={activeModal === "register"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="registerName" className="modal__label">
        <input
          id="registerName"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="registerEmail" className="modal__label">
        <input
          id="registerEmail"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="registerEmail"
        />
      </label>
      <label htmlFor="current-password" className="modal__label">
        <input
          id="current-password"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>

      <div className="modal__label-register-location">
        <div className="modal__location-options">
          <label className="modal__label-register-radio">
            <input
              className="modal__label-register-radio-btn"
              type="radio"
              name="locationOption"
              value="find"
              checked={selectedOption === "find"}
              onChange={() => handleToggleOption("find")}
            />
            Find My Location
          </label>
          <label className="modal__label-register-radio">
            <input
              className="modal__label-register-radio-btn"
              type="radio"
              name="locationOption"
              value="zip"
              checked={selectedOption === "zip"}
              onChange={() => handleToggleOption("zip")}
            />
            Enter ZIP Code
          </label>
        </div>

        {selectedOption === "find" && location && (
          <p className="modal__location-text">
            Your current location: {location}
          </p>
        )}

        {selectedOption === "zip" && (
          <div className="modal__input-register-zip-container">
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="modal__input-zip"
            />
            <button
              type="button"
              className="modal__other-btn-zip"
              onClick={handleZipCodeLookup}
            >
              Find Location
            </button>
            {zipLocation && (
              <p className="modal__location-text">{zipLocation}</p>
            )}
          </div>
        )}

        <div className="modal__other-buttons">
          <button
            className="modal__other-btn"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
