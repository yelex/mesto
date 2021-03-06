import Popup from "./Popup.js"

export default class PopupWithForm extends Popup  {
  constructor({ popupSelector , handleFormSubmit, handleFormOpen}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._handleFormOpen = handleFormOpen;
      this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  open() {
    super.open();
    this._handleFormOpen();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setFormSubmitListener(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._setFormSubmitListener.bind(this))
  }
}
