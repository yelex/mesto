import Popup from "../components/Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor({ popupSelector, setSubmitBtnText }) {
    super(popupSelector);
    this._form = this._popup.querySelector('form');
    this._setSubmitBtnText = setSubmitBtnText;
  }

  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
    this.setEventListeners();
  }

  close() {
    super.close();
    this._setSubmitBtnText("Сохранение...");
    this.unsetEventListeners();
  }

  open() {
    super.open();
    this._setSubmitBtnText("Да");
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit)
  }

  unsetEventListeners() {
    this._form.removeEventListener('submit', this._handleFormSubmit)
  }
}
