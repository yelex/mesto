export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const cardElement = card.content.querySelector('.card').cloneNode(true);
    return cardElement
  }

  _handleLikeClick() {
    this._element.querySelector('.card__heart-ico').classList.toggle('card__heart-ico_active');
  }

  _handleRemoveClick() {
    this._element.closest('.card').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__heart-ico').addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._element.querySelector('.card__trash-ico').addEventListener('click', () => {
      this._handleRemoveClick();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._element
  }
}
