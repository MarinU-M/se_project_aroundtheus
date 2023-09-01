export default class Card {
  constructor(
    data,
    cardSelector,
    cardDeletePopupSelector,
    handleCardClick,
    handleDeleteClick,
    addLikeClick,
    deleteLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = document.querySelector(cardSelector);

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._addLikeClick = addLikeClick;
    this._deleteLikeClick = deleteLikeClick;

    this._element = this._cardSelector.content
      .querySelector(".card")
      .cloneNode(true);
    this._likeBtn = this._element.querySelector("#card__like-button");
    this._deleteBtn = this._element.querySelector("#card__delete-button");
    this._cardImage = this._element.querySelector("#card__image");
    this._cardTitle = this._element.querySelector("#card__title");
  }

  _handleLikeIcon() {
    if (!this._likeBtn.classList.contains("card__like-button_active")) {
      this._likeBtn.classList.add("card__like-button_active");
      this._addLikeClick(this._id);
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
      this._deleteLikeClick(this._id);
    }
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this._id);
    this._element.remove();
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
      this._handleCardClick({ name: this._name, link: this._link });
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
