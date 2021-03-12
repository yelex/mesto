const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupCardForm = document.querySelector('form[name="cardForm"]');
const popupCardTitle = popupCardForm.querySelector('#title');
const popupCardLink = popupCardForm.querySelector('#link');
const popupCard = popupCardForm.closest('.popup');

const popupProfileForm = document.querySelector('form[name="profileForm"]');
const popupProfileName = popupProfileForm.querySelector('#name');
const popupProfileJob = popupProfileForm.querySelector('#job');
const popupProfile = popupProfileForm.closest('.popup');

const popupCloseBtnCard = popupCard.querySelector('.popup__close-btn');
const popupSubmitBtnCard = popupCard.querySelector('.popup__submit-btn');


const popupCloseBtnProfile = popupProfile.querySelector('.popup__close-btn');
const popupSubmitBtnProfile = popupProfile.querySelector('.popup__submit-btn');

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

function closePopupHandler(popup){
  popup.classList.remove('popup_opened');
}

function openPopupHandler(popup){
  popup.classList.add('popup_opened');
}

function textContentSet(elemRecipient, elemDonorValue){
  elemRecipient.textContent = elemDonorValue;
}

function addNewCard (title, link, listCards){
  const newCard = {
    name: title,
    link: link
  };
  listCards.unshift(newCard);
}

function removeChilds(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setImageAttributes(originalImg, srcToInsert, altToInsert){
  originalImg.src = srcToInsert;
  originalImg.alt = altToInsert;
}

function initializeCards(initialCards, listCards, cardTemplate){

  if (listCards){
    removeChilds(listCards);
  }

  initialCards.forEach(item => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__heart-ico').addEventListener('click', evt => evt.target.classList.toggle('card__heart-ico_active'));
    card.querySelector('.card__trash-ico').addEventListener('click', evt => evt.target.closest('.card').remove());

    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__title').textContent = item.name;

    function openPopupImageHandler () {
      setImageAttributes(popupImageFigure, item.link, item.name);
      textContentSet(popupCaption, item.name);
      openPopupHandler(popupImage);
    }

    card.querySelector('.card__image').addEventListener('click', openPopupImageHandler);

    cardList.append(card);
  })
}

initializeCards(initialCards, cardList, cardTemplate);

profileEditBtn.addEventListener('click', function(){
  openPopupHandler(popupProfile);
});

cardAddBtn.addEventListener('click', function(){
  openPopupHandler(popupCard);
});

popupCloseBtnCard.addEventListener('click', function(){
  closePopupHandler(popupCard);
});

popupCloseBtnProfile.addEventListener('click', function(){
  closePopupHandler(popupProfile);
});

popupCloseBtnImage.addEventListener('click', function(){
  closePopupHandler(popupImage);
});

popupCardForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  addNewCard(popupCardTitle.value, popupCardLink.value, initialCards);
  initializeCards(initialCards, cardList, cardTemplate);
  closePopupHandler(popupCard);
});

popupProfileForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  textContentSet(profileName, popupProfileName.value);
  textContentSet(profileJob, popupProfileJob.value);
  closePopupHandler(popupProfile);
});






