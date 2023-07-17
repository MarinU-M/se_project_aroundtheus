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
  //   console.log(errorMessageElement);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textcontent = inputElement.validationMessage;
  //   console.log(errorMessageElement.textcontent);
  errorMessageElement.classList.add(errorClass);
}
function hideInputError(formElement, inputElement, options) {}
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function setEventListeners(formElement, options) {
  const inputSelector = options.inputSelector;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
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
