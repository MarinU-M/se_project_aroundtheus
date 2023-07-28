export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    console.log(this._cardSelector);
  }

  _setEventListeners() {
    // #card__like-button
    const cardLikeBtn = this._cardElement.querySelector("#card__like-button");
    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle("card__like-button_active");
    });
    console.log(cardLikeBtn.classList);
    // #card__delete-button
    const cardDeleteBtn = this._cardElement.querySelector(
      "#card__delete-button"
    );
    cardDeleteBtn.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    console.log(this._cardElement);
    // set event listener
    this._setEventListeners();
    // return the card
  }
}
