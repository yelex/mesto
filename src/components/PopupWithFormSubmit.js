import Popup from "../components/Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    console.log(this._popup);
    this._form = this._popup.querySelector('form');
  }

  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
  }

  close() {
    super.close();
    this.unsetEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit)
  }

  unsetEventListeners() {
    this._form.removeEventListener('submit', this._handleFormSubmit)
  }
}
