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

function toggleBtnState(inputElements, submitButtonSelector, options) {
  const inactiveButtonClass = options.inactiveButtonClass;
  let foundInvalid = false;

  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButtonSelector[0].classList.add(inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector[0].classList.remove(inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const submitButtonSelector = formElement.querySelectorAll(
    options.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleBtnState(inputElements, submitButtonSelector, options);
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

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
