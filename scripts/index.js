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

function initializeCards(initialCards){
  const cardList = document.querySelector('.cards__list');
  const cardTemplate = document.querySelector('#card').content;

  initialCards.forEach(item => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__title').textContent = item.name;

  // отображаем на странице
    cardList.append(card);
  })
}

initializeCards(initialCards);
