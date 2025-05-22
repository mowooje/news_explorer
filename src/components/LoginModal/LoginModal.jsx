import React, { useEffect } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ handleLogin, isOpen, onClose }) {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email-login" className="modal__label">
        Email
      </label>
      <input
        type="email"
        className="modal__input"
        id="email-login"
        name="email"
        placeholder="Enter email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label className="modal__label" htmlFor="password-login">
        Password
      </label>
      <input
        type="password"
        className="modal__input"
        id="password-login"
        name="password"
        placeholder="Enter password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Sign in
        </button>
        <div className="modal__signup-container">
          <p className="modal__or-text">or</p>
          <button type="button" className="modal__to-register">
            Sign up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
