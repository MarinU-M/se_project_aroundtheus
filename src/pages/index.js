import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileEditForm,
  photoAddForm,
  profileEditBtn,
  profileNameInput,
  profileDescInput,
  photoAddBtn,
  photoTitle,
  photoLink,
} from "../utils/constants.js";
import "../pages/index.css";

/* ------------------ */
/*      Functions     */
/* ------------------ */

function createCard(cardData, cardTemplate) {
  const cardElement = new Card(cardData, cardTemplate);
  return cardElement.getView();
}

const userInfo = new UserInfo("#profile__name", "#profile__description");

function handleProfileEditSubmit(obj) {
  const { name, description } = obj;

  userInfo.setUserInfo(name, description);
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
const editPopup = new PopupWithForm("#profile-popup", (obj) => {
  handleProfileEditSubmit(obj);
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm("#photo-add-popup", (obj) => {
  handlePhotoAddSubmit(obj);
});
addPopup.setEventListeners();

const photoPopup = new PopupWithImage("#full-photo-popup");
photoPopup.setEventListeners();

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
profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();

  profileNameInput.value = name;
  profileDescInput.value = description;
  editPopup.open();
  editFormValidator.resetValidation();
});

// handle the photo add popup
photoAddBtn.addEventListener("click", () => {
  addPopup.open();
  addFormValidator.resetValidation();
});
