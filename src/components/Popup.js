export default class Popup {
  constructor(popupSelector) {
    // The constructor has a single parameter, which is the popup selector.
    this._popupEl = document.querySelector(popupSelector);
  }

  // open() and close() that will open and close the popup.
  open() {
    this._popupEl.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  close() {
    this._popupEl.classList.remove("popup_opened");
    console.log(this);
    document.removeEventListener("keydown", this._closeByEscape);
  }

  // _handleEscClose() for closing the popup by pressing the Esc key.
  _closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // setEventListeners() that adds a event listener to close the popup when clicked overlay or close button
  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
