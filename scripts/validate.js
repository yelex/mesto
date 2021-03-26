const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут

  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (fieldset, {inputSelector, submitButtonSelector,
  inactiveButtonClass, ...rest}) => {
  // Найдём все поля формы и сделаем из них массив

  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  const buttonElement = fieldset.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(fieldset, inputElement, {...rest});
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, fieldSetSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

    });
    const fieldsetList = Array.from(formElement.querySelectorAll(fieldSetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, {...rest});
    });

  });
};


enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  fieldSetSelector: '.popup__fieldset',
});
