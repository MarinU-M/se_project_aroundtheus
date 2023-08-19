import Popup from "./Popup.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = document.querySelector(cardSelector);

    this._handleCardClick = new Popup("#full-photo-popup");

    this._element = this._cardSelector.content
      .querySelector(".card")
      .cloneNode(true);
    this._likeBtn = this._element.querySelector("#card__like-button");
    this._deleteBtn = this._element.querySelector("#card__delete-button");
    this._cardImage = this._element.querySelector("#card__image");
    this._cardTitle = this._element.querySelector("#card__title");
    this._fullPhotoPopup = document.querySelector("#full-photo-popup");
    this._previewPhoto =
      this._fullPhotoPopup.querySelector(".popup__full-photo");
    this._previewTitle = this._fullPhotoPopup.querySelector(".popup__title");
  }
  _handleLikeIcon() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePhotoPopup() {
    this._previewPhoto.src = this._link;
    this._previewPhoto.alt = this._name;
    this._previewTitle.innerText = this._name;
    const cardData = {
      name: this._name,
      link: this._link,
    };
    this._handleCardClick.open(cardData);
  }

  _setEventListeners() {
    // #card__like-button
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    // #card__delete-button
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    // #full-photo-popup
    this._cardImage.addEventListener("click", () => {
      this._handlePhotoPopup();
    });
  }

  getView() {
    // set event listener
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    // return the card
    return this._element;
  }
}
