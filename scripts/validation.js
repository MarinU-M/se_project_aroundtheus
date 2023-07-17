// enabling validation by calling enableValidation()
// pass all the settings on call

const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
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
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
