const popupImage = document.querySelector('.popup_image');

const popupCard = document.querySelector('.popup_card');
const popupCardForm = document.querySelector('form[name="cardForm"]');
const popupImageFigure = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const ESC_KEY = 'Escape';

function openPopupHandler(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscListener);
}

function closePopupHandler(popup){
  popup.classList.remove('popup_opened');
  if (popup===popupCard){
    popupCardForm.reset();
  }
  document.removeEventListener('keydown', closeEscListener);
}

function closeEscListener(evt){
  if (evt.key===ESC_KEY){
    closePopupHandler(document.querySelector('.popup_opened'));
  }
}

function setTextContent(elemRecipient, elemDonorValue){
  elemRecipient.textContent = elemDonorValue;
}

function openPopupImageHandler (name, link) {
  popupImageFigure.src = link;
  popupImageFigure.alt = name;

  setTextContent(popupCaption, name);
  openPopupHandler(popupImage);
}

export { popupImageFigure, popupCaption, openPopupHandler, openPopupImageHandler, closePopupHandler, setTextContent, popupCard, popupCardForm, popupImage }
