
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function closePopupHandler (evt) {
  document.querySelector('.popup').remove();
}

function openPopupHandler (evt) {

  const popupTemplate = document.querySelector('#popup').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);

  const popupForm = popup.querySelector('.popup__container');
  const popupCloseBtn = popup.querySelector('.popup__close-btn');
  const popupSubmitBtn = popup.querySelector('.popup__submit-btn');
  const popupTitle = popup.querySelector('.popup__title');
  const firstInputElement = popup.querySelector('.popup__input_first');
  const lastInputElement = popup.querySelector('.popup__input_last');


  if (evt.target.classList.contains('profile__edit-button')){
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

  document.querySelector('.page').append(popup);
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

  // popup.classList.remove('popup_opened');
  closePopupHandler();
}

profileEditBtn.addEventListener('click', openPopupHandler);
cardAddBtn.addEventListener('click', openPopupHandler);

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
  while (cardList.firstChild) {
    cardList.removeChild(cardList.firstChild);
  }
  const cardTemplate = document.querySelector('#card').content;
  console.log()
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

