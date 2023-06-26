const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditmodal = document.querySelector("#modal");
const profileEditCloseBtn = document.querySelector("#close");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const profileEditForm = profileEditmodal.querySelector("#modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector("#gallery__cards");

// Functions
function togglemodal() {
  profileEditmodal.classList.toggle("modal__opened");
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);

  // access the card title and image and store them in variables
  const cardImageElement = cardElement.querySelector("#card__image");
  const cardTitleElement = cardElement.querySelector("#card__title");
  // set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleElement.innerText = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

// Event Listner
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.innerText;
  togglemodal();
});

profileEditCloseBtn.addEventListener("click", function () {
  profileDescriptionInput.value = profileDescription.innerText;
  togglemodal();
});

profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.innerText = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  togglemodal();
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});
