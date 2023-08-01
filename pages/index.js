import { popups, openPopup, closePopup } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

/* ------------------ */
/*      Elements      */
/* ------------------ */
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

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Wrapper
const profileEditPopup = document.querySelector("#profile-popup");
const profileEditForm = document.forms["profile_form"];
const cardList = document.querySelector("#gallery__cards");
const photoAddPopup = document.querySelector("#photo-add-popup");
const photoAddForm = document.forms["photo_form"];

// Button and others
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const photoAddBtn = document.querySelector("#profile__add-button");

// From inputs
const profileNameInput = profileEditPopup.querySelector("#name-input");
const profileDescriptionInput =
  profileEditPopup.querySelector("#description-input");
const photoTitleInput = photoAddPopup.querySelector("#title-input");
const photoLinkInput = photoAddPopup.querySelector("#image-link-input");

/* ------------------ */
/*      Functions     */
/* ------------------ */

function createCard(cardData, cardList) {
  const cardElement = new Card(cardData, cardList);
  return cardElement.getView();
}

function renderCard(cardData, cardList) {
  const cardElement = createCard(cardData, "#card-template");
  cardList.prepend(cardElement);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.innerText = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

function handlePhotoAddSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: photoTitleInput.value,
    link: photoLinkInput.value,
  };
  // const submitBtn = photoAddPopup.querySelector(".popup__save");
  renderCard(cardData, cardList);
  closePopup(photoAddPopup);
  photoAddForm.reset();
  // submitBtn.disabled = true;
  addFormValidator.toggleBtnState();
  // submitBtn.classList.add("popup__save_disabled");
}

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// render the cards
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, "#card-template");
  cardList.append(cardElement);
});

// open the profile edit popup
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  openPopup(profileEditPopup);
});

// save the profile edit popup
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// open the photo add popup
photoAddBtn.addEventListener("click", function () {
  openPopup(photoAddPopup);
});

// save the photo add popup
photoAddForm.addEventListener("submit", handlePhotoAddSubmit);

// close the popup when clicked overlay oe close button
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

/* ----------------------- */
/*      Event Handler      */
/* ----------------------- */

// enable form validator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, photoAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
