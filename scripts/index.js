let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let profileEditBtn = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let formElement = document.querySelector('.popup__container');
let nameInputElement = formElement.querySelector('#name');
let jobInputElement = formElement.querySelector('#job');

function togglePopupHandler (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

function openEditHandler (evt) {
  togglePopupHandler(evt);
  jobInputElement.value = profileJob.textContent;
  nameInputElement.value = profileName.textContent;
}

popupCloseBtn.addEventListener('click', togglePopupHandler);
profileEditBtn.addEventListener('click', openEditHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInputElement.value;
  profileJob.textContent = jobInputElement.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
