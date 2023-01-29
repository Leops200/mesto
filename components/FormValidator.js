export class FormValidator {
  constructor(validationObj, form) {
    this._form = form;
    this._inputSelector = validationObj.inputSelector;
    this._inactiveBtnClass = validationObj.inactiveButtonClass;
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._btnSubmit = this._form.querySelector(validationObj.submitButtonSelector);
    this._inputErrorClass = validationObj.inputErrorClass;
    this._errorClass = validationObj.errorClass;
  };

  //* настраиваем слушатели
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', ()=> {
        this._toggleInputError(input);
        this._toggleButtonState();
      });
    });
  this._form.addEventListener('reset', () => {
    //console.log('reset'); // ресет пока не работает
    this._btnSubmit.disabled = true
  });
  };

  // Устанавливаем состояние кнопки отправки
  _toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)){
      this._btnSubmit.disabled = true;
      this._btnSubmit.classList.add(this._inactiveBtnClass);
      return;
    }
    this._btnSubmit.disabled = false
    this._btnSubmit.classList.remove(this._inactiveBtnClass);
  };

  // Переключатель показа/скрытия несоответствия ввода
  _toggleInputError(input) {
    !input.validity.valid
      ? this._showError(input, input.validationMessage)
      : this._hideError(input)
  };

  // Проверка состояния валидации
  _hasInvalidInput() { 
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  // Скрытие ошибки ввода
  _hideError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Отображение ошибки ввода
  _showError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Перезагрузка валидации при каждом вводе
  resetErrs = () => {
    this._inputList.forEach((input) => {
      if (input.classList.contains(this._inputErrorClass)) {
        this._hideError(input);
      };
    });
  };

  // Активация валидации
  enableValidation() {
    this._setEventListeners();
  };

  // Активация функции состояния кнопки
  handleBtnCheckValidity = () => {
    this._toggleButtonState();
  };
};