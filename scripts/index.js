import Card from "./Card.js";

const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupCard = document.querySelector('.popup_card');
const popupCardForm = document.querySelector('form[name="cardForm"]');
const popupCardTitle = popupCardForm.querySelector('#title');
const popupCardLink = popupCardForm.querySelector('#link');
const popupCardSubmitBtn = popupCardForm.querySelector('.popup__submit-btn');

const popupProfile = document.querySelector('.popup_profile');
const popupProfileForm = document.querySelector('form[name="profileForm"]');
const popupProfileName = popupProfileForm.querySelector('#name');
const popupProfileJob = popupProfileForm.querySelector('#job');
popupProfileName.value = profileName.textContent;
popupProfileJob.value = profileJob.textContent;

const popupCloseBtnCard = popupCard.querySelector('.popup__close-btn');
const popupCloseBtnProfile = popupProfile.querySelector('.popup__close-btn');

const popupImage = document.querySelector('.popup_image');

const popupImageFigure = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupCloseBtnImage = popupImage.querySelector('.popup__close-btn');

const cardList = document.querySelector('.cards__list');
const cardTemplateSelector = '#card';

const ESC_KEY = 'Escape';

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

function closeEscListener(evt){
  if (evt.key===ESC_KEY){
    closePopupHandler(document.querySelector('.popup_opened'));
  }
}

function closePopupHandler(popup){
  popup.classList.remove('popup_opened');
  if (popup===popupCard){
    popupCardForm.reset();
  }
  document.removeEventListener('keydown', closeEscListener);
}

function openPopupHandler(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscListener);
}

function setTextContent(elemRecipient, elemDonorValue){
  elemRecipient.textContent = elemDonorValue;
}

function addFirstChild (parent, elementToInsert){
  parent.prepend(elementToInsert);
}

function openPopupImageHandler (data) {
  popupImageFigure.src = data.link;
  popupImageFigure.alt = data.name;

  setTextContent(popupCaption, data.name);
  openPopupHandler(popupImage);
}

//убрать createCard (дублирование с Card.js)
function createCard(data, cardTemplateSelector){
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.generateCard();
  cardElement.querySelector('.card__image').addEventListener('click', function(){
    openPopupImageHandler(data);
  });
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






