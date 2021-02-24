let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let profileEditBtn = document.querySelector('.profile__edit-button');

function closeHandler (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

popupCloseBtn.addEventListener('click', closeHandler);
profileEditBtn.addEventListener('click', closeHandler);


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
}

formElement.addEventListener('submit', formSubmitHandler);
