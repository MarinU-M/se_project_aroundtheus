// close the popup when esc is pressed
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      const openedPopup = popup.classList.contains("popup_opened");
      if (openedPopup) {
        closePopup(popup);
      }
    });
  }
}

// open popup and add esc event listener
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// close popup and remove esc event listener
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _handleLikeIcon() {
    this._cardSelector
      .querySelector("#card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardSelector.remove();
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
    this._cardSelector
      .querySelector("#card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    // #card__delete-button
    this._cardSelector
      .querySelector("#card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // #full-photo-popup
    this._cardSelector
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
