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

// Wrapper
const profileEditModal = document.querySelector("#profile-modal");
const profileEditForm = profileEditModal.querySelector("#modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector("#gallery__cards");
const photoAddModal = document.querySelector("#photo-modal");
const photoAddForm = photoAddModal.querySelector("#photo-modal__form");
const fullPhotoModal = document.querySelector("#fullPhoto-modal");

// Button and others
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileEditCloseBtn = profileEditModal.querySelector("#close");
const photoAddBtn = document.querySelector("#profile__add-button");
const photoAddCloseBtn = photoAddModal.querySelector("#close");
const fullPhotoCloseBtn = fullPhotoModal.querySelector("#close");

// const fullPhotoCloseBtn = fullPhotoModal.querySelector("#close");

// From inputs
const profileNameInput = profileEditModal.querySelector("#name-input");
const profileDescriptionInput =
  profileEditModal.querySelector("#description-input");
const photoTitleInput = photoAddModal.querySelector("#title-input");
const photoLinkInput = photoAddModal.querySelector("#image-link-input");

/* ------------------ */
/*      Functions     */
/* ------------------ */

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card__image");
  const cardTitleElement = cardElement.querySelector("#card__title");
  const cardLikeBtn = cardElement.querySelector("#card__like-button");
  const cardDeleteBtn = cardElement.querySelector("#card__delete");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    fullPhotoModal.querySelector(".modal__full-photo").src = cardData.link;
    fullPhotoModal.querySelector(".modal__full-photo").alt = cardData.name;
    fullPhotoModal.querySelector(".modal__title").innerText = cardData.name;
    toggleModal(fullPhotoModal);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.innerText = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.innerText = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  toggleModal(profileEditModal);
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

function handlePhotoAddSubmit(evt) {
  evt.preventDefault();
  const name = photoTitleInput.value;
  const link = photoLinkInput.value;
  renderCard({ name, link }, cardList);
  toggleModal(photoAddModal);
}

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// open the profile edit popup
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  toggleModal(profileEditModal);
});

// close the proffile edit popup
profileEditCloseBtn.addEventListener("click", function () {
  toggleModal(profileEditModal);
});

// save the profile edit popup
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// render the cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});

// open the photo add popup
photoAddBtn.addEventListener("click", function () {
  toggleModal(photoAddModal);
});

// close the photo add popup
photoAddCloseBtn.addEventListener("click", function () {
  toggleModal(photoAddModal);
});

// save the photo add popup
photoAddForm.addEventListener("submit", handlePhotoAddSubmit);

// close the full photo modal
fullPhotoCloseBtn.addEventListener("click", () => {
  toggleModal(fullPhotoModal);
});
