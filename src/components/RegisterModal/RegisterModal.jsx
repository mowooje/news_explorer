import React, { useEffect } from "react";
import "./RegisterModal.css";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  setActiveModal,
  handleRegistration,
}) {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign up"
      altButtonText={
        <div className="modal__button-container">
          <button type="submit" className="modal__submit">
            Sign in
          </button>
          <div className="modal__signup-container">
            <p className="modal__or-text">or</p>
            <button
              type="button"
              className="modal__to-register"
              onClick={() => setActiveModal("login")}
            >
              Sign up
            </button>
          </div>
        </div>
      }
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-register">
        Email
        <input
          className="modal__input"
          name="email"
          type="email"
          id="email-register"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label className="modal__label" htmlFor="password-register">
        Password
      </label>
      <input
        type="password"
        className="modal__input"
        id="password-register"
        name="password"
        placeholder="Enter password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <label className="modal__label">
        Username{" "}
        <input
          className="modal__input"
          name="username"
          type="username"
          placeholder="Enter your username"
          value={values.username || ""}
          onChange={handleChange}
          required
        />
        {errors.username && (
          <span className="modal__error">{errors.username}</span>
        )}
      </label>

      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Sign up
        </button>
        <div className="modal__signup-container">
          <p className="modal__or-text">or</p>
          <button
            type="button"
            className="modal__to-register"
            onClick={() => setActiveModal("register")}
          >
            Sign in
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
