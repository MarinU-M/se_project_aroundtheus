export default class Popup {
  constructor(popupSelector) {
    // The constructor has a single parameter, which is the popup selector.
    this._popupSelector = document.querySelector(popupSelector);
  }

  //   It stores the public methods open() and close() that will open and close the popup.
  open() {}

  close() {}

  //   It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
  _handleEscClose() {}

  //   It stores a public method named setEventListeners() that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form.
  setEventListeners() {
    addEventListener("click");
  }
}
