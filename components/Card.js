export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
  }

  _closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
  }

  _closeByEscape(evt) {
    const popups = document.querySelectorAll(".popup");
    if (evt.key === "Escape") {
      popups.forEach((popup) => {
        const openedPopup = popup.classList.contains("popup_opened");
        if (openedPopup) {
          closePopup(popup);
        }
      });
    }
  }

  _handleLikeIcon() {
    cardLikeBtn.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handlePhotoPopup() {
    const fullPhotoPopup = document.querySelector("#full-photo-popup");
    const previewPhoto = fullPhotoPopup.querySelector(".popup__full-photo");
    const previewTitle = fullPhotoPopup.querySelector(".popup__title");
    previewPhoto.src = this._link;
    previewPhoto.alt = this._name;
    previewTitle.innerText = this._name;
    _openPopup(fullPhotoPopup);
  }

  _setEventListeners() {
    // #card__like-button
    this._cardElement
      .querySelector("#card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    // #card__delete-button
    this._cardElement
      .querySelector("#card__delete-button")
      .addEventListener("click", this._handleDeleteCard);
    // #full-photo-popup
    this._cardElement
      .querySelector("#card__image")
      .addEventListener("click", this._handlePhotoPopup);
  }

  _getTemplate() {
    // get the card view
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true));
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector("#card__image");
    const cardTitle = this._element.querySelector("#card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    // / set event listener
    this._setEventListeners();
    // return the card
    return this;
  }
}
