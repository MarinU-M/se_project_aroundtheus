import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popupEl.querySelector(".popup__title");
    this._image = this._popupEl.querySelector(".popup__full-photo");
  }
  //   add an image to the popup and the corresponding image src attribute along with a caption for the image.
  open() {
    super.open();
  }
}
