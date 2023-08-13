import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //   the popup selector, and a callback function which PopupWithForm calls when the form’s submit event fires
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupEl.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  //   collects data from all the input fields and returns that data as an object.
  _getInputValues() {
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    const inputObj = {};
    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    console.log(inputObj);
    return inputObj;
  }

  //   add the submit event handler to the form and the click event listener to the close icon
  setEventListeners() {
    const inputValues = this._getInputValues();
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  //   to reset the form once the popup is closed.
  close() {
    this._popupForm.reset();
    super.close();
  }
}
