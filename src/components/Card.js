export default class Card {
  constructor({ title, link, id, likeUserIds, handleCardClick, setColorHeart, handleLikeClick }, templateSelector) {
    this._title = title;
    this._link = link;
    this.id = id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.setColorHeart = setColorHeart;
    this.likeUserIds = likeUserIds;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const cardElement = card.content.querySelector('.card').cloneNode(true);
    return cardElement
  }

  _handleRemoveClick() {
    this._element.closest('.card').remove();
  }

  _setHandleCardClick(evt) {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._heartIco.addEventListener('click', this._handleLikeClick.bind(this))

    this._element.querySelector('.card__trash-ico').addEventListener('click', this._handleRemoveClick.bind(this))

    this._element.querySelector('.card__image').addEventListener('click', this._setHandleCardClick.bind(this));
  }

  _renderLikeNumber(likeNumber) {
    this._likeNumberElement.textContent = likeNumber.toString()
  }

  setActiveHeart(isActive) {

    if (isActive) {
      this._heartIco.classList.add('card__heart-ico_active');
    } else {
      this._heartIco.classList.remove('card__heart-ico_active');
    }
  }

  setLikeStatus(likeUserIds) {
    this.likeUserIds = likeUserIds;
    this.setColorHeart();
    this._renderLikeNumber(this.likeUserIds.length);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._heartIco = this._element.querySelector('.card__heart-ico');
    this._setEventListeners();
    this._likeNumberElement = this._element.querySelector('.card__heart-counter');
    this.setLikeStatus(this.likeUserIds);
    this._element.querySelector('.card__title').textContent = this._title;
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    return this._element
  }
}
