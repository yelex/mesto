let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let profileEditBtn = document.querySelector('.profile__edit-button');

function togglePopupHandler (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

function openEditHandler (evt) {
  togglePopupHandler(evt);
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  jobInputElement.value = profileJob.textContent;
  nameInputElement.value = profileName.textContent;
}

popupCloseBtn.addEventListener('click', togglePopupHandler);
profileEditBtn.addEventListener('click', openEditHandler);


let formElement = document.querySelector('.popup__container');

let nameInputElement = formElement.querySelector('#name');
let jobInputElement = formElement.querySelector('#job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let jobInput = jobInputElement.value;
    let nameInput = nameInputElement.value;

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = nameInput;
    profileJob.textContent = jobInput;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
