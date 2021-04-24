import { ESC_KEY } from '../utils/constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key===ESC_KEY){
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')||evt.target.classList.contains('popup__close-btn')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose.bind(this))
  }
}
