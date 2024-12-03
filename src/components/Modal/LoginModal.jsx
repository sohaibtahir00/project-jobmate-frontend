import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

function LoginModal({ activeModal, onClose, onLogin, handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email.trim().toLowerCase(),
      password: password,
    };

    onLogin(userData);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={activeModal === "login"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="loginEmail" className="modal__label">
        <input
          id="loginEmail"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        <input
          id="loginPassword"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="Login-Password"
        />
      </label>
      <div className="modal__other-buttons">
        <button
          className="modal__other-btn"
          type="button"
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
