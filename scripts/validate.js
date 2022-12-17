
// -- Функция включения валидации
export const enableValidation = (validationObj) => {
  const { formSelector, ...restObj } = validationObj;
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach((formSelector) => {
   formSelector.addEventListener('submit', (evt) =>{
     evt.preventDefault();
   })
   setEventListeners(formSelector, restObj);
  })
 };

/* -- Функция управляющая переключателем кнопки
 Принимает на фход "true" или "false". Как вариант,
 можно реализовать активацию/деактивацию кнопки 
 только в этой функции, но в задании - нужно чтобы 
 каждая функция отвечала за что-то одно, по-этому разделил
 на две функции (ниже та, что управляет кнопкой) */
const checkInputValidity = (inputs) => {
  return inputs.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

// -- Функция управления кнопкой
const toggleButtonState = (inputs, btnSave, validationObj) => {
  const { inactiveButtonClass } = validationObj;
  if (checkInputValidity(inputs)) {
    btnSave.classList.add(inactiveButtonClass);
    return;
  }
    btnSave.classList.remove(inactiveButtonClass);//меняем стиль на неактивный
    btnSave.disabled = 'disabled';// деактивируем саму кнопку
};

// -- функция включения показа ошибки ввода
const showInputError = (formSelector, inputSelector, errText, validationObj) => {
  const { inputErrorClass, errorClass} = validationObj;
  const errorForm = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorForm.classList.add(errorClass);
  errorForm.textContent = errText;
};

// -- Функция управления отображением ошибки ввода
const toggleInputError = (formSelector, inputSelector, validationObj) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationObj);
    return;
  }
    hideInputError(formSelector, inputSelector, validationObj);
};

// -- Функция удаления показа ошибки ввода
const hideInputError = (formSelector, inputSelector, validationObj) =>{
  const { inputErrorClass, errorClass} = validationObj;
  const errorForm = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorForm.classList.remove(errorClass);
  errorForm.textContent = "";
};

// -- Функция сброса предупреждений
export const resetErrs = (formSelector, validationObj) => {
  const inputs = Array.from(formSelector.querySelectorAll(validationObj.inputSelector));
  inputs.forEach((inputSelector) => {
    if (inputSelector.classList.contains(validationObj.inputErrorClass)){
      hideInputError (formSelector, inputSelector, validationObj);
    }
  })
};

// -- Функция конфигурации слушателя 
const setEventListeners = (formSelector, validationObj) => {
  const {inputSelector, submitButtonSelector, ...restObj } = validationObj;
  const btnSave = formSelector.querySelector(submitButtonSelector);
  const inputs = [...formSelector.querySelectorAll(inputSelector)];
  toggleButtonState(inputs, btnSave, restObj);
  inputs.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      toggleButtonState(inputs, btnSave, restObj);
      toggleInputError(formSelector, inputSelector, restObj);
    })
  })
};