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
  formElements, formSettings, initialCards,
  cardTemplateSelector }
  from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";


popupProfileName.value = profileName.textContent;
popupProfileJob.value = profileJob.textContent;

const addCardToCardList = ({ name, link }, cardList) =>{
  const card = new Card(
    { name, link, handleCardClick: () => {
      popupWithImage.open({name, link})
    }
    },
    cardTemplateSelector,
    );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// подключаем валидацию для всех форм
const formListSection = new Section({
  items: formElements,
  renderer: (item) => {
    const formValidator = new FormValidator(formSettings, item);
    formValidator.enableValidation();
    },
  }
);
formListSection.renderItems()

const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userJobSelector: userJobSelector
})

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
    }
  }
)

const popupWithFormCard = new PopupWithForm(
  {popupSelector: popupCardSelector,
    handleFormSubmit: ({ name, link }) => {
      addCardToCardList({ name,link }, cardList);
      popupWithFormCard.close();
    }
  }
)
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    addCardToCardList({ name,link }, cardList);
  }},
  cardListSelector
);
cardList.renderItems()

profileEditBtn.addEventListener('click', function(){
  popupWithFormProfile.open();
  const { userName, userJob } = userInfo.getUserInfo();
  popupProfileName.value = userName;
  popupProfileJob.value = userJob;
});

cardAddBtn.addEventListener('click', function(){
  popupWithFormCard.open();
  popupCardSubmitBtn.disabled = true;
  popupCardSubmitBtn.classList.add('popup__submit-btn_disabled');
});
