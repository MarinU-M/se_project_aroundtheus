// enabling validation by calling enableValidation()
// pass all the settings on call

/* -------------------- */
/*       Functions      */
/* -------------------- */
function showInputError(formElement, inputElement, options) {
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const inputErrorClass = options.inputErrorClass;
  const errorClass = options.errorClass;
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputElements) {
  return !inputElements.every((inputElement) => inputElement.validity.valid);
}

function toggleBtnState(inputElements, submitButton, options) {
  const inactiveButtonClass = options.inactiveButtonClass;

  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  toggleBtnState(inputElements, submitButton, options);
  submitButton.disabled = true;
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleBtnState(inputElements, submitButton, options);
    });
  });
  // look all inputs inside of the forms
  // loop through all the inputs to see if all are valid
  //   if inputs are not valid
  //     get validation message
  //     add error class to input
  //     display error message
  //     disable button
  //   if inputs are valid
  //     enable button
  //     reset error message
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

/* ------------------ */
/*      Elements      */
/* ------------------ */
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
