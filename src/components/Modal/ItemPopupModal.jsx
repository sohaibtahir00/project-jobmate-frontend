import ModalWithForm from "./ModalWithForm";
import "./ItemPopupModal.css";

function ItemPopupModal({ activeModal, onClose, handleRegister, handleLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <ModalWithForm
      title="Join Us to Apply"
      buttonText="Sign Up"
      isOpen={activeModal === "popup-register"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="itempopupmodal__content">
        To proceed with your job search and unlock all job details, please log
        in if you already have an account, or sign up to create a new one. It
        only takes a moment, and you’ll gain access to the best job
        opportunities tailored just for you!
      </p>
      <div className="modal__itempopupmodal-buttons">
        <button
          className="modal__itempopupmodal-login-btn"
          type="button"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default ItemPopupModal;
