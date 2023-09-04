import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //   the popup selector, and a callback function which PopupWithForm calls when the form’s submit event fires
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupEl.querySelector(".popup__form");
    this._submitBtn = this._popupForm.querySelector(".popup__save");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    this._deleteBtn = this._popupEl.querySelector(".popup__save");
  }

  //   collects data from all the input fields and returns that data as an object.
  _getInputValues() {
    const inputObj = {};
    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  //   add the submit event handler to the form and the click event listener to the close icon
  setEventListeners() {
    super.setEventListeners();
    // this._renderLoading(true);
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
      // this._renderLoading(false);
    });
  }

  // add the submit event handler to the button and the click event listener to the close icon
  setDeleteEventListeners(obj) {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      // console.log(evt);
      evt.preventDefault();
      this._handleFormSubmit(obj);
      this.close();
    });
  }

  //
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  //   to reset the form once the popup is closed.
  close() {
    this._popupForm.reset();
    super.close();
  }

  // set user information to form
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // render loading message
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    }
  }
}
