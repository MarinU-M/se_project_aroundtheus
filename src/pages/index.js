import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  config,
  profileEditBtn,
  photoAddBtn,
  profilePhoto,
} from "../utils/constants.js";
import "../pages/index.css";

/* ----------------------- */
/*     Class Instances     */
/* ----------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6d3d8659-087c-48a4-9b8b-b1f3f711b21d",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  "#profile__name",
  "#profile__description",
  "#profile__image"
);

// get user info from the server and set profile section
api.getUsersInfo().then((res) => {
  console.log(res);
  return userInfo.setUserInfo(res);
});

const editPopup = new PopupWithForm("#profile-popup", (obj) => {
  handleProfileEditSubmit(obj);
});
const addPopup = new PopupWithForm("#photo-add-popup", (obj) => {
  handlePhotoAddSubmit(obj);
});
const deletePopup = new PopupWithForm("#photo-delete-popup", (obj) => {
  handleCardDeleteSubmit(obj);
});
const changePopup = new PopupWithForm("#profile-photo-popup", (obj) => {
  changePopup.renderLoading(true);
  handleProfilePhotoSubmit(obj);
});
const photoPopup = new PopupWithImage("#full-photo-popup");

/* ----------------------- */
/*     Form Validation     */
/* ----------------------- */
const formValidators = {};
// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // get the name of the form
    const formName = formElement.getAttribute("name");

    // store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/* ------------------ */
/*      Functions     */
/* ------------------ */

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      photoPopup.open(cardData);
    },
    (cardId) => {
      deletePopup.open();

      deletePopup.setDeleteEventListeners(cardId);
      deletePopup.setSubmitAction(
        (cardId) => {
          cardElement.removeCard(cardId);
        },
        (cardId) => {
          api.addCardLike(cardId);
        },
        (cardId) => {
          api.deleteCardLike(cardId);
        }
      );
    }
  );
  return cardElement.getView();
}

function handleProfileEditSubmit(obj) {
  api
    .editProfile(obj)
    .then((obj) => {
      editPopup.renderLoading(true);
      userInfo.setUserInfo(obj);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

function handlePhotoAddSubmit(obj) {
  api
    .addNewCard(obj)
    .then((obj) => {
      addPopup.renderLoading(true);
      const newCard = createCard(obj, "#card-template");
      section.addItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

function handleCardDeleteSubmit(obj) {
  console.log(obj);
  api
    .deleteCard(obj)
    .then(() => {
      deletePopup.renderLoading(true);
      cardElement.removeCard(obj);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

function handleProfilePhotoSubmit(obj) {
  api
    .editProfilePhoto(obj)
    .then((obj) => {
      userInfo.setUserInfo(obj);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}
/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// eneble event listeners in each form
editPopup.setEventListeners();
addPopup.setEventListeners();
photoPopup.setEventListeners();
changePopup.setEventListeners();

// handle the profile edit popup
profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  console.log(name);
  editPopup.setInputValues({ name, about });
  editPopup.open();
  formValidators["profile_form"].resetValidation();
});

// handle the photo add popup
photoAddBtn.addEventListener("click", () => {
  addPopup.open();
  formValidators["photo_form"].resetValidation();
});

// handle the profile photo change popup
profilePhoto.addEventListener("click", () => {
  changePopup.open();
  formValidators["profile_photo_form"].resetValidation();
});

// load card list from server
let section;
api.getCardList().then((res) => {
  const cardList = res;
  section = new Section(
    {
      items: cardList,
      renderer: (cardData) => {
        const newCard = createCard(cardData);
        section.addItem(newCard);
      },
    },
    "#gallery__cards"
  );
  return section.renderItems();
});
