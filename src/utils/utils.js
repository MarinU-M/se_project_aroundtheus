const popups = document.querySelectorAll(".popup");

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

export { popups, openPopup, closePopup };
