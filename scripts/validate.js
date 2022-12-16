
// -- Функция включения валидации
export const enableValidation = (validationObj) => {
  const { formSelector, ...restObj } = validationObj;
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach((formSelector) => {
   formSelector.addEventListener('submit', (evt) =>{
     evt.preventDefault();
   })
   formDataEvents(formSelector, restObj);
  })
 };

/* -- Функция управляющая переключателем кнопки
 Принимает на фход "true" или "false". Как вариант,
 можно реализовать активацию/деактивацию кнопки 
 только в этой функции, но в задании - нужно чтобы 
 каждая функция отвечала за что-то одно, по-этому разделил
 на две функции (ниже та, что управляет кнопкой) */
const inputIncorrect = (inputs) => {
  return inputs.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

// -- Функция управления кнопкой
const btnDisabledTgl = (inputs, btnSave, validationObj) => {
  const { inactiveButtonClass } = validationObj;
  if (inputIncorrect(inputs)) {
    btnSave.classList.add(inactiveButtonClass);
    return;
  }
    btnSave.classList.remove(inactiveButtonClass);
};

// -- функция включения показа ошибки ввода
const errVisibl = (formSelector, inputSelector, errText, validationObj) => {
  const { inputErrorClass, errorClass} = validationObj;
  const errElem = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errElem.classList.add(errorClass);
  errElem.textContent = errText;
};

// -- Функция управления отображением ошибки ввода
const valdationTestinput = (formSelector, inputSelector, validationObj) => {
  if (!inputSelector.validity.valid) {
    errVisibl(formSelector, inputSelector, inputSelector.validationMessage, validationObj);
    return;
  }
    errDelete(formSelector, inputSelector, validationObj);
};

// -- Функция удаления показа ошибки ввода
const errDelete = (formSelector, inputSelector, validationObj) =>{
  const { inputErrorClass, errorClass} = validationObj;
  const errElem = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errElem.classList.remove(errorClass);
  errElem.textContent = "";
};

// -- Функция сброса предупреждений
export const resetErrs = (formSelector, validationObj) => {
  const inputs = Array.from(formSelector.querySelectorAll(validationObj.inputSelector));
  inputs.forEach((inputSelector) => {
    if (inputSelector.classList.contains(validationObj.inputErrorClass)){
      desErr (formSelector, inputSelector, validationObj);
    }
  })
};

// -- Функция конфигурации слушателя 
const formDataEvents = (formSelector, validationObj) => {
  const {inputSelector, submitButtonSelector, ...restObj } = validationObj;
  const btnSave = formSelector.querySelector(submitButtonSelector);
  const inputs = [...formSelector.querySelectorAll(inputSelector)];
  btnDisabledTgl(inputs, btnSave, restObj);
  inputs.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      btnDisabledTgl(inputs, btnSave, restObj);
      valdationTestinput(formSelector, inputSelector, restObj);
    })
  })
};