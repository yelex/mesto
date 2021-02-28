let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let profileEditBtn = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let popupForm = document.querySelector('.popup__container');
let nameInputElement = popupForm.querySelector('#name');
let jobInputElement = popupForm.querySelector('#job');

function togglePopupHandler (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

function closeEditHandler (evt) {
  togglePopupHandler(evt);
  jobInputElement.value = '';
  nameInputElement.value = '';
}

function openEditHandler (evt) {
  togglePopupHandler(evt);
  jobInputElement.value = profileJob.textContent;
  nameInputElement.value = profileName.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInputElement.value;
  profileJob.textContent = jobInputElement.value;
  popup.classList.remove('popup_opened');
}

popupCloseBtn.addEventListener('click', closeEditHandler);
profileEditBtn.addEventListener('click', openEditHandler);
popupForm.addEventListener('submit', formSubmitHandler);
