import { openPopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _handleLikeIcon() {
    this._element
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePhotoPopup() {
    const fullPhotoPopup = document.querySelector("#full-photo-popup");
    const previewPhoto = fullPhotoPopup.querySelector(".popup__full-photo");
    const previewTitle = fullPhotoPopup.querySelector(".popup__title");

    previewPhoto.src = this._link;
    previewPhoto.alt = this._name;
    previewTitle.innerText = this._name;
    openPopup(fullPhotoPopup);
  }

  _setEventListeners() {
    // #card__like-button
    this._element
      .querySelector("#card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    // #card__delete-button
    this._element
      .querySelector("#card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // #full-photo-popup
    this._element
      .querySelector("#card__image")
      .addEventListener("click", () => {
        this._handlePhotoPopup();
      });
  }

  _getTemplate() {
    // get the card view
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    // set event listener
    this._setEventListeners();

    const cardImage = this._element.querySelector("#card__image");
    const cardTitle = this._element.querySelector("#card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // return the card

    return this._element;
  }
}
