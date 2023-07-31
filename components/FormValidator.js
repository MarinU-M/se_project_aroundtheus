export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputElements) {
    return !inputElements.every((inputElement) => inputElement.validity.valid);
  }

  toggleBtnState(inputElements, submitButton) {
    if (this._hasInvalidInput(inputElements)) {
      submitButton.classList.add(this._inactiveButtonClass);
      return (submitButton.disabled = true);
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _showInputError(_formElement, inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(_formElement, inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(_formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement);
    } else {
      this._hideInputError(this._formElement, inputElement);
    }
  }

  _setEventListeners(_formElement) {
    const inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this.toggleBtnState(inputElements, submitButton);
    // submitButton.disabled = true;
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(this._formElement, inputElement);
        this.toggleBtnState(inputElements, submitButton);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }
}
