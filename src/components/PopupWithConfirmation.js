import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupEl.querySelector(".popup__form");
    // this._handleFormSubmit = handleFormSubmit;
    this._deleteBtn = this._popupEl.querySelector(".popup__save");
  }

  //
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._deleteBtn.textContent = "Saving...";
    }
    if (!isLoading) {
      this._deleteBtn.textContent = "Yes";
    }
  }
  // add the submit event handler to the button and the click event listener to the close icon
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (obj) => {
      //   evt.preventDefault();
      this._handleFormSubmit(obj);
    });
  }
}
