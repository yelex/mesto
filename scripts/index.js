const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupCard = document.querySelector('.popup_card');
const popupCardForm = document.querySelector('form[name="cardForm"]');
const popupCardTitle = popupCardForm.querySelector('#title');
const popupCardLink = popupCardForm.querySelector('#link');

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
const cardTemplate = document.querySelector('#card').content;

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

function closePopupHandler(popup, popupForm){
  popup.classList.remove('popup_opened');
  if (popupForm){
    popupForm.reset();
  }
}

function openPopupHandler(popup){
  popup.classList.add('popup_opened');
}

function textContentSet(elemRecipient, elemDonorValue){
  elemRecipient.textContent = elemDonorValue;
}

function removeChilds(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function addFirstChild (parent, elementToInsert){
  const theFirstChild = parent.firstChild;
  parent.insertBefore(elementToInsert, theFirstChild);
}

function openPopupImageHandler (title, link) {
  popupImageFigure.src = link;
  popupImageFigure.alt = title;

  textContentSet(popupCaption, title);
  openPopupHandler(popupImage);
}

function createCard(title, link, cardTemplate){
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = title;

  card.querySelector('.card__heart-ico').addEventListener('click', evt => evt.target.classList.toggle('card__heart-ico_active'));
  card.querySelector('.card__trash-ico').addEventListener('click', evt => evt.target.closest('.card').remove());
  card.querySelector('.card__title').textContent = title;

  card.querySelector('.card__image').addEventListener('click', function(){
    openPopupImageHandler(title, link);
  });
  return card
}

function addNewCard(title, link, listCards, cardTemplate){

  const card = createCard(title, link, cardTemplate);

  addFirstChild(listCards, card);
}

function initializeCards(initialCards, listCards, cardTemplate){
  initialCards.forEach(item => {
    addNewCard(item.name, item.link, listCards, cardTemplate);
  })
}

initializeCards(initialCards, cardList, cardTemplate);

profileEditBtn.addEventListener('click', function(){
  openPopupHandler(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileJob.textContent;
});

cardAddBtn.addEventListener('click', function(){
  openPopupHandler(popupCard);
});

popupCloseBtnCard.addEventListener('click', function(){
  closePopupHandler(popupCard, popupCardForm);
});

document.addEventListener('keydown', function (evt) {
  if (evt.key=='Escape'){
    if (popupProfile.classList.contains('popup_opened')) {
      closePopupHandler(popupProfile, popupProfileForm);
    }
    if (popupCard.classList.contains('popup_opened')) {
      closePopupHandler(popupCard, popupCardForm);
    }
    if (popupImage.classList.contains('popup_opened')) {
      closePopupHandler(popupImage);
    }
  };
})

popupCard.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopupHandler(popupCard, popupCardForm);
  }
});

popupProfile.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_opened')) {
    closePopupHandler(popupProfile, popupProfileForm);
  }
});

popupImage.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_opened')) {
    closePopupHandler(popupImage);
  }
});

popupCloseBtnProfile.addEventListener('click', function(){
  closePopupHandler(popupProfile, popupProfileForm);
});

popupCloseBtnImage.addEventListener('click', function(){
  closePopupHandler(popupImage);
});

popupCardForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  addNewCard(popupCardTitle.value, popupCardLink.value, cardList, cardTemplate);
  closePopupHandler(popupCard, popupCardForm);
});

popupProfileForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  textContentSet(profileName, popupProfileName.value);
  textContentSet(profileJob, popupProfileJob.value);
  closePopupHandler(popupProfile, popupProfileForm);
});






