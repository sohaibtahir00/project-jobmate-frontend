import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import getUserLocation from "../../utils/ipinfoApi";
import fetchLocationByZip from "../../utils/zipApi";

function EditUserModal({ activeModal, onClose, onRegister, existingUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipLocation, setZipLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setName(savedUserData.name || "");
      setEmail(savedUserData.email || "");
      setPassword(savedUserData.password || "");
      setLocation(savedUserData.location || "None");
    } else if (existingUserData) {
      setName(existingUserData.name || "");
      setEmail(existingUserData.email || "");
      setPassword(existingUserData.password || "");
      setLocation(existingUserData.location || "None");
    }
  }, [existingUserData]);

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

  useEffect(() => {
    if (selectedOption === "find") {
      fetchUserLocation();
    }
  }, [selectedOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      name,
      email,
      password,
      location: location || "None",
    };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    onRegister(updatedUserData);
  };

  return (
    <ModalWithForm
      title="Update User Info"
      buttonText="Update"
      isOpen={activeModal === "update-user"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="editName" className="modal__label">
        <input
          id="editName"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="editEmail" className="modal__label">
        <input
          id="editEmail"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="editPassword" className="modal__label">
        <input
          id="editPassword"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="editPassword"
        />
      </label>

      <div className="modal__label-register">
        <div className="modal__location-options">
          <label className="modal__label-register-radio">
            <input
              className="modal__label-register-radio-btn"
              type="radio"
              name="locationOption"
              value="find"
              checked={selectedOption === "find"}
              onChange={() => setSelectedOption("find")}
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
              onChange={() => setSelectedOption("zip")}
            />
            Enter ZIP Code
          </label>
        </div>

        {selectedOption === "find" && location && (
          <p>Your current location: {location}</p>
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
            {zipLocation && <p>{zipLocation}</p>}
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

export default EditUserModal;
