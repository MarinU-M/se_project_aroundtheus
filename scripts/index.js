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
const profileEditForm = profileEditModal.querySelector("#profile_form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector("#gallery__cards");
const photoAddModal = document.querySelector("#photo-add-modal");
const photoAddForm = photoAddModal.querySelector("#photo-modal__form");
const fullPhotoModal = document.querySelector("#full-photo-modal");

// Button and others
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileEditCloseBtn = profileEditModal.querySelector("#profile_close");
const photoAddBtn = document.querySelector("#profile__add-button");
const photoAddCloseBtn = photoAddModal.querySelector("#photo-add-close");
const fullPhotoCloseBtn = fullPhotoModal.querySelector("#full-photo-close");
const previewPhoto = fullPhotoModal.querySelector(".modal__full-photo");
const previewTitle = fullPhotoModal.querySelector(".modal__title");

// From inputs
const profileNameInput = profileEditModal.querySelector("#name-input");
const profileDescriptionInput =
  profileEditModal.querySelector("#description-input");
const photoTitleInput = photoAddModal.querySelector("#title-input");
const photoLinkInput = photoAddModal.querySelector("#image-link-input");

/* ------------------ */
/*      Functions     */
/* ------------------ */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
    previewPhoto.src = cardData.link;
    previewPhoto.alt = cardData.name;
    previewTitle.innerText = cardData.name;
    openModal(fullPhotoModal);
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
  closeModal(profileEditModal);
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
  closeModal(photoAddModal);
  evt.target.reset();
}

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// open the profile edit popup
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  openModal(profileEditModal);
});

// close the proffile edit popup
profileEditCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
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
  openModal(photoAddModal);
});

// close the photo add popup
photoAddCloseBtn.addEventListener("click", function () {
  closeModal(photoAddModal);
});

// save the photo add popup
photoAddForm.addEventListener("submit", handlePhotoAddSubmit);

// close the full photo modal
fullPhotoCloseBtn.addEventListener("click", () => {
  closeModal(fullPhotoModal);
});
