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

const userInfo = new UserInfo("#name-input", "#description-input");

function handleProfileEditSubmit(obj) {
  const { name, description } = userInfo.getUserInfo();

  console.log({ name, description });
  userInfo.setUserInfo(name, description);
  profileName.innerText = name;
  profileDescription.innerText = description;

  editPopup.close();
}

function handlePhotoAddSubmit(obj) {
  const cardData = {
    name: obj.title,
    link: obj.image,
  };
  const newCard = createCard(cardData, "#card-template");
  section.addItem(newCard);
}

/* ----------------------- */
/*     Class Instances     */
/* ----------------------- */

// enable form validator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, photoAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Popup instance for each form
const editPopup = new PopupWithForm("#profile-popup", () => {
  handleProfileEditSubmit();
});

const addPopup = new PopupWithForm("#photo-add-popup", (obj) => {
  handlePhotoAddSubmit(obj);
});

const photoPopup = new PopupWithImage("#full-photo-popup");

// render initialcards
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

// handle the profile edit popup
profileEditBtn.addEventListener("click", (obj) => {
  const { name, description } = userInfo.getUserInfo();
  console.log({ name, description });
  userInfo.setUserInfo(name, description);

  editPopup.open();
  editPopup.setEventListeners();

  // name = profileName.innerText;
  // description = profileDescription.innerText;
  editFormValidator.resetValidation();
});

// handle the photo add popup
photoAddBtn.addEventListener("click", (obj) => {
  addPopup.open();
  addPopup.setEventListeners();
  obj.title = photoTitle.innerText;
  obj.image = photoLink.innerText;
  addFormValidator.resetValidation();
});

// handle preview photo event listeners
photoPopup.setEventListeners();
