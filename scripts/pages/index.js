import Card from "../Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopupHandler, closePopupHandler, setTextContent, popupImage, popupCard, popupCardForm } from "../utils.js";

const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


const popupCardTitle = popupCardForm.querySelector('#title');
const popupCardLink = popupCardForm.querySelector('#link');
const popupCardSubmitBtn = popupCardForm.querySelector('.popup__submit-btn');

const popupProfile = document.querySelector('.popup_profile');
const popupProfileForm = document.querySelector('form[name="profileForm"]');
const popupProfileName = popupProfileForm.querySelector('#name');
const popupProfileJob = popupProfileForm.querySelector('#job');
popupProfileName.value = profileName.textContent;
popupProfileJob.value = profileJob.textContent;

const cardList = document.querySelector('.cards__list');
const cardTemplateSelector = '#card';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formElements = document.querySelectorAll('.popup__container');
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

formElements.forEach(formElement => {
  const formValidator = new FormValidator(formSettings, formElement);
  formValidator.enableValidation();
})

function addFirstChild (parent, elementToInsert){
  parent.prepend(elementToInsert);
}

function createCard(data, cardTemplateSelector){
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.generateCard();
  return cardElement
}

function addNewCard(data, listCards, cardTemplateSelector){
  const card = createCard(data, cardTemplateSelector);
  addFirstChild(listCards, card);
}

function initializeCards(initialCards, listCards, cardTemplateSelector){
  initialCards.forEach(item => {
    addNewCard(item, listCards, cardTemplateSelector);
  })
}

initializeCards(initialCards, cardList, cardTemplateSelector);

profileEditBtn.addEventListener('click', function(){
  openPopupHandler(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileJob.textContent;
});

cardAddBtn.addEventListener('click', function(){
  openPopupHandler(popupCard);
  popupCardSubmitBtn.disabled = true;
  popupCardSubmitBtn.classList.add('popup__submit-btn_disabled');
});

popupCard.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')||evt.target.classList.contains('popup__close-btn')) {
    closePopupHandler(popupCard);
  };
});

popupProfile.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_opened')||evt.target.classList.contains('popup__close-btn')) {
    closePopupHandler(popupProfile);
  };
});

popupImage.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_opened')||evt.target.classList.contains('popup__close-btn')) {
    closePopupHandler(popupImage);
  };
});

popupCardForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = popupCardTitle.value;
  newCardData.link = popupCardLink.value;
  addNewCard(newCardData, cardList, cardTemplateSelector);
  closePopupHandler(popupCard);
});

popupProfileForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  setTextContent(profileName, popupProfileName.value);
  setTextContent(profileJob, popupProfileJob.value);
  closePopupHandler(popupProfile);
});






