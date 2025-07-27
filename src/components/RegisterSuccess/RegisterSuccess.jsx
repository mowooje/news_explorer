import React from "react";
import "./RegisterSuccess.css";
import closeButton from "../../assets/close-button.svg";

function RegisterSuccess({ isOpen, onClose, onSignInClick }) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_success">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="Close" />
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <button
          onClick={onSignInClick}
          type="button"
          className="modal__redirect-link"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccess;
