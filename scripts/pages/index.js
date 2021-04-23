import Card from "../Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopupHandler, closePopupHandler, setTextContent, popupImage, popupCard, popupCardForm } from "../utils/utils.js";

popupProfileName.value = profileName.textContent;
popupProfileJob.value = profileJob.textContent;

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






