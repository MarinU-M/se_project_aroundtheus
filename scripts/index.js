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

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditPopup = document.querySelector("#popup");
const profileEditCloseBtn = document.querySelector("#close");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const profileEditForm = profileEditPopup.querySelector("#popup__form");

function togglePopup() {
  profileEditPopup.classList.toggle("popup__opened");
}

profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.innerText;
  togglePopup();
});

profileEditCloseBtn.addEventListener("click", function () {
  profileDescriptionInput.value = profileDescription.innerText;
  togglePopup();
});

profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.innerText = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  togglePopup();
});
