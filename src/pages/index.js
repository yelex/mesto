// подключение главного CSS-файла (для Webpack)
import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { profileEditBtn, popupCardSubmitBtn, cardAddBtn,
  userJobSelector, userNameSelector, cardListSelector,
  captionSelector, imageSelector, popupImageSelector,
  popupProfileSelector, popupCardSelector, profileName,
  popupProfileName, profileJob, popupProfileJob,
  formElementsObj, formSettings, initialCards,
  cardTemplateSelector }
  from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

const createCard = ({ title, link }) => {
  const card = new Card(
    { title, link, handleCardClick: () => {
      popupWithImage.open({title, link})
    }
    },
    cardTemplateSelector,
    );
  const cardElement = card.generateCard();
  return cardElement
}

const addCardToCardList = (cardElement, cardList) =>{
  cardList.addItem(cardElement);
}

const cardList = new Section({
  renderer: ({ name, link }) => {
    const newCard = createCard({title: name, link});
    addCardToCardList(newCard, cardList);
  }},
  cardListSelector
);

const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userJobSelector: userJobSelector
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '58d9bd2a-6b34-4d93-8ca3-98d968550c4e',
    'Content-Type': 'application/json'
  }
});

api.getAllInitialData().then(args => {
  const [ cards, profileInfo ] = args;
  cardList.setItems(cards);
  cardList.renderItems();
  userInfo.setUserInfo({ name: profileInfo.name, job: profileInfo.about});
})

// подключаем валидацию для всех форм
const addCardFormValidator = new FormValidator(formSettings, formElementsObj.cardForm);
const editProfileFormValidator = new FormValidator(formSettings, formElementsObj.profileForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(
  {popupSelector: popupImageSelector,
    imageSelector: imageSelector,
    popupCaptionSelector: captionSelector
  }
)

const popupWithFormProfile = new PopupWithForm(
  {popupSelector: popupProfileSelector,
    handleFormSubmit: ({ name, job }) => {
      api.setInfoAboutMe({ name: name, about: job })
      .then(res => {
        userInfo.setUserInfo({ name: res.name, job: res.about });
      })
      .then(_ => {
        popupWithFormProfile.close();
      })
    },
    handleFormOpen: () => {
      editProfileFormValidator.inputElements.forEach(inputElement => {
        editProfileFormValidator.hideInputError(inputElement);
      })
      editProfileFormValidator.toggleButtonState();
    }
  }
)

const popupWithFormCard = new PopupWithForm(
  {popupSelector: popupCardSelector,
    handleFormSubmit: ({ title, link }) => {
      const newCard = createCard({title, link});
      addCardToCardList(newCard, cardList);
      popupWithFormCard.close();
    },
    handleFormOpen: () => {
      addCardFormValidator.inputElements.forEach(inputElement => {
        addCardFormValidator.hideInputError(inputElement);
      })
      addCardFormValidator.toggleButtonState();
    }
  }
)
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();

profileEditBtn.addEventListener('click', function(){
  const { userName, userJob } = userInfo.getUserInfo();
  popupProfileName.value = userName;
  popupProfileJob.value = userJob;
  popupWithFormProfile.open();
});

cardAddBtn.addEventListener('click', function(){
  popupCardSubmitBtn.disabled = true;
  popupCardSubmitBtn.classList.add('popup__submit-btn_disabled');
  popupWithFormCard.open();
});
