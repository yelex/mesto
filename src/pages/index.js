// подключение главного CSS-файла (для Webpack)
import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithFormSubmit from "../components/PopupWithFormSubmit.js";
import { profileEditBtn, popupCardSubmitBtn, cardAddBtn,
  userJobSelector, userNameSelector, cardListSelector,
  captionSelector, imageSelector, popupImageSelector,
  popupProfileSelector, popupCardSelector, profileName,
  popupProfileName, profileJob, popupProfileJob,
  formElementsObj, formSettings, initialCards,
  cardTemplateSelector, popupDeleteSelector, popupAvatarSelector,
  popupAvatarBtn, popupAvatarSubmitBtn, popupProfileSubmitBtn, avatarImgElement,
  popupDeleteSubmitBtn }
  from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import { getIds } from "../utils/utils.js";

const popupWithImage = new PopupWithImage(
  {popupSelector: popupImageSelector,
    imageSelector: imageSelector,
    popupCaptionSelector: captionSelector
  }
)

const popupWithFormProfile = new PopupWithForm (
  {popupSelector: popupProfileSelector,
    handleFormSubmit: ({ name, job }) => {
      popupProfileSubmitBtn.textContent = "Сохранение...";
      api.setInfoAboutMe({ name: name, about: job })
      .then(res => {
        userInfo.setUserInfo({ name: res.name, job: res.about });
        popupWithFormProfile.close();
      })
      .catch(err => console.log(err))
      .finally(_ => popupProfileSubmitBtn.textContent = "Сохранить")
    },
    handleFormOpen: () => {
      setValidator(editProfileFormValidator);
    }
  }
)

const popupWithFormAvatar = new PopupWithForm (
  {popupSelector: popupAvatarSelector,
    handleFormSubmit: ({ linkAvatar }) => {
      popupAvatarSubmitBtn.textContent = "Сохранение...";
      api.addAvatarToApi(linkAvatar)
       .then(profileInfo => {
        userInfo.setUserInfo({ name: profileInfo.name, job: profileInfo.about, userId: profileInfo._id, avatarLink: profileInfo.avatar });
        avatarImgElement.src = userInfo.avatarLink;
        avatarImgElement.alt = userInfo.name;
        popupWithFormAvatar.close();
       })
       .catch(err => console.log(err))
       .finally(_ => popupWithFormAvatar.textContent = "Сохранить")

    },
    handleFormOpen: () => {
      setValidator(editAvatarFormValidator);
    }
  }
)

const popupWithFormDelete = new PopupWithFormSubmit(
  { popupSelector: popupDeleteSelector, setSubmitBtnText: (text)=>{
    popupDeleteSubmitBtn.textContent = text
  }
}
)

const popupWithFormCard = new PopupWithForm(
  {popupSelector: popupCardSelector,
    handleFormSubmit: ({ title, link }) => {
      popupCardSubmitBtn.textContent = "Сохранение..."
      api.addNewCardApi({ title, link })
      .then(({ name, link, _id }) => {

          const likeUserIds = [];
          const isMyCard = true;
          const newCard = createCard({title: name, link, id: _id, likeUserIds, isMyCard});
          cardList.addItem(newCard);
          popupWithFormCard.close()
        })
        .catch(err => console.log(err))
        .finally(_ => popupCardSubmitBtn.textContent = "Создать")
      },
    handleFormOpen: () => {
      setValidator(addCardFormValidator);
    }
  }
)
popupWithFormDelete.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithFormAvatar.setEventListeners();

const createCard = ({ title, link, id, likeUserIds, isMyCard }) => {

  const card = new Card(
    { title, link, id, likeUserIds,
      handleCardClick: () => {
      popupWithImage.open({title, link})}
      ,
      setColorHeart: () => {

      if (card.likeUserIds.includes(userInfo.userId)) {
        card.setActiveHeart(true)
      } else {
        card.setActiveHeart(false)
      }},
      handleLikeClick: () => {

        const promise = card.likeUserIds.includes(userInfo.userId) ? api.removeLikeToCardApi(card.id) : api.addLikeToCardApi(card.id)
        promise.then(({ likes }) => {
          const likeUserIds = getIds(likes);
          card.setLikeStatus(likeUserIds);
        }).catch(err => console.log(err))
        },
      handleRemoveClick: () => {
        popupWithFormDelete.setSubmitAction(()=>{
          api.removeCardApi(card.id)
          .then(_ => {
            card.removeCard();
            popupWithFormDelete.close();
          })
          .catch(err => console.error(err))
        })
        popupWithFormDelete.open();
      },
      isMyCard
    },
    cardTemplateSelector,
    );
  const cardElement = card.generateCard();
  return cardElement
}

const addCardToCardList = (cardElement, cardList) =>{
  cardList.addItem(cardElement);
}

const setValidator = (validator) =>{
  validator.inputElements.forEach(inputElement => {
    validator.hideInputError(inputElement);
  })
  validator.toggleButtonState();;
}

const cardList = new Section({
  renderer: ({ name, link, _id, likes, owner }) => {
    const likeUserIds = getIds(likes);
    const isMyCard = owner._id === userInfo.userId ? true : false
    const newCard = createCard({title: name, link, id: _id, likeUserIds, isMyCard});
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

api.getAllInitialData()
  .then(args => {
  const [ cards, profileInfo ] = args;
  userInfo.setUserInfo({ name: profileInfo.name, job: profileInfo.about, userId: profileInfo._id, avatarLink: profileInfo.avatar });
  avatarImgElement.src = userInfo.avatarLink;
  avatarImgElement.alt = userInfo.name;
  cardList.setItems(cards);
  cardList.renderItems();
  })
  .catch(err => console.log(err))


const addCardFormValidator = new FormValidator(formSettings, formElementsObj.cardForm);
const editProfileFormValidator = new FormValidator(formSettings, formElementsObj.profileForm);
const editAvatarFormValidator = new FormValidator(formSettings, formElementsObj.avatarForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();


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

popupAvatarBtn.addEventListener('click', function(){
  popupAvatarSubmitBtn.disabled = true;
  popupAvatarSubmitBtn.classList.add('popup__submit-btn_disabled');
  popupWithFormAvatar.open();
});
