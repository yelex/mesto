const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function closePopupHandler (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
  document.querySelector('.popup__input_first').value = '';
  document.querySelector('.popup__input_last').value = '';
}

function openPopupFormHandler (evt) {

  const popup = document.querySelector('.popup');

  const popupForm = popup.querySelector('.popup__container');
  const popupCloseBtn = popup.querySelector('.popup__close-btn');
  const popupSubmitBtn = popup.querySelector('.popup__submit-btn');
  const popupTitle = popup.querySelector('.popup__title');
  const firstInputElement = popup.querySelector('.popup__input_first');
  const lastInputElement = popup.querySelector('.popup__input_last');


  if (evt.target.classList.contains('profile__edit-button')){
    console.log('profile');
    popupForm.name = "profileForm";
    firstInputElement.value = profileName.textContent;
    firstInputElement.id = "name";
    firstInputElement.name = "name";
    firstInputElement.type = "text";
    firstInputElement.placeholder = "Жак-Ив Кусто";

    lastInputElement.value = profileJob.textContent;
    lastInputElement.id = "job";
    lastInputElement.name = "job";
    lastInputElement.type = "text";
    lastInputElement.placeholder = "Исследователь океана";

    popupTitle.textContent = 'Редактировать профиль';
    popupSubmitBtn.textContent = 'Сохранить';

  } else {
    console.log('card');
    popupForm.name = "cardForm";

    firstInputElement.id = "title";
    firstInputElement.name = "title";
    firstInputElement.placeholder = "Название";
    firstInputElement.type = "text";

    lastInputElement.id = "link";
    lastInputElement.name = "link";
    lastInputElement.placeholder = "Ссылка на картинку";
    lastInputElement.type = "url";

    popupTitle.textContent = 'Новое место';
    popupSubmitBtn.textContent = 'Создать';
  }
  popupCloseBtn.addEventListener('click', closePopupHandler);
  popupForm.addEventListener('submit', formSubmitHandler);


  document.querySelector('.popup').classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (evt.target.getAttribute('name')=='profileForm'){
    profileName.textContent = document.querySelector('.popup__input_first').value;
    profileJob.textContent = document.querySelector('.popup__input_last').value;
  }

  if (evt.target.getAttribute('name')=='cardForm'){
    const newCard = {
      name: document.querySelector('.popup__input_first').value,
      link: document.querySelector('.popup__input_last').value
    };

    initialCards.unshift(newCard);
    initializeCards(initialCards);
  }

  closePopupHandler(evt);
}

profileEditBtn.addEventListener('click', openPopupFormHandler);
cardAddBtn.addEventListener('click', openPopupFormHandler);

// cards initialize

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

function toggleLikeIcoCard(evt){
  evt.target.classList.toggle('card__heart-ico_active');
}

function removeCard(evt){
  evt.target.closest('.card').remove();
}

function initializeCards(initialCards){
  const cardList = document.querySelector('.cards__list');
  while (cardList.firstChild) {
    cardList.removeChild(cardList.firstChild);
  }
  const cardTemplate = document.querySelector('#card').content;

  initialCards.forEach(item => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__heart-ico').addEventListener('click', toggleLikeIcoCard);
    card.querySelector('.card__trash-ico').addEventListener('click', removeCard);

    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__image').addEventListener('click', openPopupImageHandler);
    card.querySelector('.card__title').textContent = item.name;

    cardList.append(card);
  })
}

initializeCards(initialCards);

function openPopupImageHandler (evt) {

  const popup = document.querySelector('.popup_image');

  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  const popupCloseBtn = popup.querySelector('.popup__close-btn');

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  popup.classList.add('popup_opened');
  popupCloseBtn.addEventListener('click', closePopupHandler);
}






