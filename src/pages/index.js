// подключение главного CSS-файла (для Webpack)
import './index.css';

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


const addCardToCardList = ({ title, link }, cardList) =>{
  const card = new Card(
    { title, link, handleCardClick: () => {
      popupWithImage.open({title, link})
    }
    },
    cardTemplateSelector,
    );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// подключаем валидацию для всех форм
const addCardFormValidator = new FormValidator(formSettings, formElementsObj.cardForm);
const editProfileFormValidator = new FormValidator(formSettings, formElementsObj.profileForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userJobSelector: userJobSelector
})

userInfo.setUserInfo({ name: profileName.textContent, job: profileJob.textContent})

const popupWithImage = new PopupWithImage(
  {popupSelector: popupImageSelector,
    imageSelector: imageSelector,
    popupCaptionSelector: captionSelector
  }
)

const popupWithFormProfile = new PopupWithForm(
  {popupSelector: popupProfileSelector,
    handleFormSubmit: ({ name, job }) => {
      userInfo.setUserInfo({ name, job });
      popupWithFormProfile.close();
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
      addCardToCardList({ title,link }, cardList);
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

const cardList = new Section({
  items: initialCards,
  renderer: ({ title, link }) => {
    addCardToCardList({ title, link }, cardList);
  }},
  cardListSelector
);
cardList.renderItems()

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
