import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

const editPopup = new PopupWithForm("#profile-popup", (obj) => {
  handleProfileEditSubmit(obj);
});

const addPopup = new PopupWithForm("#photo-add-popup", (obj) => {
  handlePhotoAddSubmit(obj);
});

const changePopup = new PopupWithForm("#profile-photo-popup", (obj) => {
  handleProfilePhotoSubmit(obj);
});

const photoPopup = new PopupWithImage("#full-photo-popup");

const deletePopup = new PopupWithConfirmation("#photo-delete-popup");

/* ------------------ */
/*      Functions     */
/* ------------------ */
function handleProfileEditSubmit(obj) {
  editPopup.renderLoading(true, "Save");
  api
    .editProfile(obj)
    .then((obj) => {
      userInfo.setUserInfo(obj);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false, "Save");
    });
}

function handlePhotoAddSubmit(obj) {
  addPopup.renderLoading(true, "Create");
  api
    .addNewCard(obj)
    .then((obj) => {
      const newCard = createCard(obj, "#card-template");
      section.addItem(newCard);
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPopup.renderLoading(false, "Create");
    });
}

function handleProfilePhotoSubmit(obj) {
  changePopup.renderLoading(true, "Save");
  api
    .editProfilePhoto(obj)
    .then((obj) => {
      userInfo.setUserInfo(obj);
      changePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changePopup.renderLoading(false, "Save");
    });
}

// function handleCardDeleteSubmit(obj) {
//   deletePopup.renderLoading(true);
//   api
//     .deleteCard(obj)
//     .then(() => {
//       console.log(obj);
//       // cardElement.removeCard(obj);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       deletePopup.renderLoading(false);
//     });
// }

// create card element
function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      photoPopup.open(cardData);
    },
    (cardId) => {
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        deletePopup.renderLoading(true),
          api
            .deleteCard(cardId)
            .then(() => {
              // cardElement.removeCard(obj);
              cardElement.removeCard(cardId);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              deletePopup.renderLoading(false);
              deletePopup.close();
            });
      });
    },
    (cardId) => {
      api.addCardLike(cardId).catch((err) => {
        console.log(err);
      });
    },
    (cardId) => {
      api.removeCardLike(cardId).catch((err) => {
        console.log(err);
      });
    }
  );
  return cardElement.getView();
}

/* --------------------- */
/*      Initial Info     */
/* --------------------- */

// load card list and user info from the server and render them
let section;
api
  .getAPIInfo()
  .then(([profile, cards]) => {
    userInfo.setUserInfo(profile);
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          section.addItem(newCard);
        },
      },
      "#gallery__cards"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// eneble event listeners in each form
editPopup.setEventListeners();
addPopup.setEventListeners();
photoPopup.setEventListeners();
changePopup.setEventListeners();
deletePopup.setEventListeners();

// handle the profile edit popup
profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
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
