export default class Card {
  constructor({ title, link, handleCardClick }, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const cardElement = card.content.querySelector('.card').cloneNode(true);
    return cardElement
  }

  _handleLikeClick() {
    this._heartIco.classList.toggle('card__heart-ico_active');
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

  _setHeartIco() {
    this._heartIco = this._element.querySelector('.card__heart-ico');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setHeartIco();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    return this._element
  }
}
