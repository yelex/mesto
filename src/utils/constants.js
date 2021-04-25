export const popupImageSelector = '.popup_image';
export const imageSelector = '.popup__image';
export const popupProfileSelector = '.popup_profile';
export const popupCardSelector = '.popup_card';
export const captionSelector = '.popup__caption';

export const userNameSelector = '.profile__name';
export const userJobSelector = '.profile__job';

const popupCardForm = document.querySelector('form[name="cardForm"]');

export const ESC_KEY = 'Escape';

export const profileEditBtn = document.querySelector('.profile__edit-button');
export const cardAddBtn = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const popupCardSubmitBtn = popupCardForm.querySelector('.popup__submit-btn');

const popupProfileForm = document.querySelector('form[name="profileForm"]');
export const popupProfileName = popupProfileForm.querySelector('#name');
export const popupProfileJob = popupProfileForm.querySelector('#job');

export const cardListSelector = '.cards__list';
export const cardTemplateSelector = '#card';

export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formElements = document.querySelectorAll('.popup__container');
export const formElementsObj = {};
formElements.forEach(formElement => {
  formElementsObj[formElement.getAttribute('name')] = formElement;
})
// console.log(formElementsObj.cardForm);
export const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
