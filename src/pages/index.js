import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileEditBtn,
  profileNameInput,
  profileDescInput,
  photoAddBtn,
} from "../utils/constants.js";
import "../pages/index.css";

/* ----------------------- */
/*     Class Instances     */
/* ----------------------- */
const userInfo = new UserInfo("#profile__name", "#profile__description");
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

/* ----------------------- */
/*     Form Validation     */
/* ----------------------- */
const formValidators = {};
// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");

    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/* ------------------ */
/*      Functions     */
/* ------------------ */

function createCard(cardData, cardTemplate) {
  const cardElement = new Card(cardData, cardTemplate);
  return cardElement.getView();
}

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

// render initialcards
section.renderItems();

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// eneble event listeners in each form
editPopup.setEventListeners();
addPopup.setEventListeners();
photoPopup.setEventListeners();

// handle the profile edit popup
profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescInput.value = description;
  editPopup.open();
  formValidators["profile_form"].resetValidation();
});

// handle the photo add popup
photoAddBtn.addEventListener("click", () => {
  addPopup.open();
  formValidators["photo_form"].resetValidation();
});
