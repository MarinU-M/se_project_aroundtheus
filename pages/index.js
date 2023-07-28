import Card from "../components/Card.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
const card = new Card(cardData, "#card-template");
card.getView();

// Wrapper
const profileEditPopup = document.querySelector("#profile-popup");
const profileEditForm = document.forms["profile_form"];
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector("#gallery__cards");
const photoAddPopup = document.querySelector("#photo-add-popup");
const photoAddForm = document.forms["photo_form"];
const fullPhotoPopup = document.querySelector("#full-photo-popup");
const popups = document.querySelectorAll(".popup");

// Button and others
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
// const profileEditCloseBtn = profileEditPopup.querySelector("#profile_close");
const photoAddBtn = document.querySelector("#profile__add-button");
// const photoAddCloseBtn = photoAddPopup.querySelector("#photo-add-close");
// const fullPhotoCloseBtn = fullPhotoPopup.querySelector("#full-photo-close");
const previewPhoto = fullPhotoPopup.querySelector(".popup__full-photo");
const previewTitle = fullPhotoPopup.querySelector(".popup__title");

// From inputs
const profileNameInput = profileEditPopup.querySelector("#name-input");
const profileDescriptionInput =
  profileEditPopup.querySelector("#description-input");
const photoTitleInput = photoAddPopup.querySelector("#title-input");
const photoLinkInput = photoAddPopup.querySelector("#image-link-input");

/* ------------------ */
/*      Functions     */
/* ------------------ */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card__image");
  const cardTitleElement = cardElement.querySelector("#card__title");
  const cardLikeBtn = cardElement.querySelector("#card__like-button");
  const cardDeleteBtn = cardElement.querySelector("#card__delete-button");

  // cardLikeBtn.addEventListener("click", () => {
  //   cardLikeBtn.classList.toggle("card__like-button_active");
  // });
  // cardDeleteBtn.addEventListener("click", () => {
  //   cardElement.remove();
  // });
  cardImageElement.addEventListener("click", () => {
    previewPhoto.src = cardData.link;
    previewPhoto.alt = cardData.name;
    previewTitle.innerText = cardData.name;
    openPopup(fullPhotoPopup);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.innerText = cardData.name;
  return cardElement;
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
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
  const name = photoTitleInput.value;
  const link = photoLinkInput.value;
  const submitBtn = photoAddPopup.querySelector(".popup__save");
  renderCard({ name, link }, cardList);
  closePopup(photoAddPopup);
  photoAddForm.reset();
  submitBtn.disabled = true;
  submitBtn.classList.add("popup__save_disabled");
}

// close the popup when esc is pressed
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      const openedPopup = popup.classList.contains("popup_opened");
      if (openedPopup) {
        closePopup(popup);
      }
    });
  }
}

// open popup and add esc event listener
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// close popup and remove esc event listener
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// render the cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
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
