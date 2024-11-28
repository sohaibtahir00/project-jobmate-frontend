import { useEffect } from "react";
import "./ModalWithForm.css";
import closeButton from "../../assets/close-btn.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={closeButton}
            alt="close button"
            className="modal__close-btn"
          />
        </button>
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
