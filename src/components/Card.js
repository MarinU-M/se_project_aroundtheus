export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
    // removeLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isliked = data.isLiked;
    this._cardSelector = document.querySelector(cardSelector);

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    // this._removeLikeClick = removeLikeClick;

    this._element = this._cardSelector.content
      .querySelector(".card")
      .cloneNode(true);
    this._likeBtn = this._element.querySelector("#card__like-button");
    this._deleteBtn = this._element.querySelector("#card__delete-button");
    this._cardImage = this._element.querySelector("#card__image");
    this._cardTitle = this._element.querySelector("#card__title");
  }

  // call this method from index.js after successful api response in `then` block
  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._handleLikeIcon();
  }

  isLiked() {
    return this._isLiked;
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-button_active");
      // this._addLikeClick(this._id);
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
      // this._removeLikeClick(this._id);
    }
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this._id);
  }

  _setEventListeners() {
    // #card__like-button
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick();
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
    this._handleLikeIcon();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    // return the card
    return this._element;
  }

  removeCard() {
    this._element.remove();
  }
}
