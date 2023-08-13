import { popups, openPopup, closePopup } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
const profileEditForm = document.forms["profile_form"];
const cardList = document.querySelector("#gallery__cards");
const photoAddPopup = document.querySelector("#photo-add-popup");
const photoAddForm = document.forms["photo_form"];

// Button and others
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const photoAddBtn = document.querySelector("#profile__add-button");
const photoTitle = photoAddPopup.querySelector("#title-input");
const photoLink = photoAddPopup.querySelector("#image-link-input");

/* ------------------ */
/*      Functions     */
/* ------------------ */

function createCard(cardData, cardTemplate) {
  const cardElement = new Card(cardData, cardTemplate);
  return cardElement.getView();
}

const userInput = new UserInfo("#profile__name", "#profile__description");
function handleProfileEditSubmit(obj) {
  profileName.innerText = obj.name;
  profileDescription.innerText = obj.description;
}

function handlePhotoAddSubmit(obj) {
  const cardData = {
    name: obj.title,
    link: obj.image,
  };
  console.log(cardData);
  section.addItem(cardData);
  // renderCard(cardData, "#card-template");
}

/* ----------------------- */
/*     Class Instances     */
/* ----------------------- */

// enable form validator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, photoAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Section instance for initialcards
const editPopup = new PopupWithForm("#profile-popup", (obj) => {
  handleProfileEditSubmit(obj);
});

const addPopup = new PopupWithForm("#photo-add-popup", (obj) => {
  handlePhotoAddSubmit(obj);
});

const photoPopup = new PopupWithImage("#full-photo-popup");

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCard = createCard(cardData, "#card-template");
      section.addItem(newCard);
    },
  },
  "#gallery__cards"
);
section.renderItems();

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */

// open the profile edit popup
profileEditBtn.addEventListener("click", (obj) => {
  editPopup.open();
  editPopup.setEventListeners();
  obj.name = profileName.innerText;
  obj.description = profileDescription.innerText;
  editFormValidator.resetValidation();
});

// open the photo add popup
photoAddBtn.addEventListener("click", (obj) => {
  addPopup.open();
  addPopup.setEventListeners();
  obj.title = photoTitle.innerText;
  obj.image = photoLink.innerText;
  addFormValidator.resetValidation();
});

photoPopup.setEventListeners();
