import Popup from "./Popup.js"

export default class PopupWithForm extends Popup  {
  constructor({ popupSelector }, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    })
  }
}
