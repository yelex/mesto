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

function addNewCard(title, link, listCards, cardTemplate){

  function createCard(){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = title;

    card.querySelector('.card__heart-ico').addEventListener('click', evt => evt.target.classList.toggle('card__heart-ico_active'));
    card.querySelector('.card__trash-ico').addEventListener('click', evt => evt.target.closest('.card').remove());
    card.querySelector('.card__title').textContent = title;

    function openPopupImageHandler () {
      popupImageFigure.src = item.link;
      popupImageFigure.alt = item.name;

      textContentSet(popupCaption, item.name);
      openPopupHandler(popupImage);
    }

    card.querySelector('.card__image').addEventListener('click', openPopupImageHandler);
    return card
  }

  const card = createCard();

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






