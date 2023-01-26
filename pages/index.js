/*
Здравствуйте, Станислав! 
Спасибо Вам за Вашу работу. Отдельная благодарность за пояснения к замечаниям. 
Проверьте, пожалуйста, еще раз.(переделал колбэки)
*/

//*-- Импорты:
import{
  // - элементы ДОМ
  popups,
  popuProfileEdit,
  popupNewCardAdd,
  popuProfileName,
  popuProfileActivity,
  popupProfileButtonOpen,
  popupCardButtonOpen,
  formProfileEdit,
  formNameInput,
  formAboutInput,
  formAddCard,
  formPlaceNameInput,
  formPlaceLinkInput,
  zoomPopup,
  imgPopupZoom,
  imgTitlePopupZoom,
  // - элемент для карточек
  cardsContainer,
  // - кнопки
  escButton,
  CLICK
} from '../utils/constants.js';

import Section from '../components/section.js';
//*--
import {initialCards} from '../utils/constants.js';
//*--
import {validationObj} from '../utils/constants.js';
//*--
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Popup from '../components/Popup.js';
//
//import {createCard} from '../utils/utils.js';

//========================================================

const cardAdd = new Section({
  items: initialCards,
  renderer: (item) =>{
    const card = new Card(item, '#card-template', handleImageClick);

      const cardElement = card.generateCard();
      cardAdd.addItem(cardElement);
  },
}, '.elements');

const newCardAdd = new Section({
  renderer: (item) =>{
    const card = new Card(item, '#card-template', handleImageClick);
    console.log(card);
    const cardElement = card.generateCard();
    cardAdd.addNewCard(cardElement);
    //newCardAdd.setEventListeners();
  }
})

// Отрисовываем любой попап
const newPopup = new Section({
  renderer: (popup) =>{
    const nPopup = new Popup(popup);
    nPopup.setEventListeners(); 
    const elementPopup = nPopup.open();
    return elementPopup;
  }
})

//newPopup.setEventListeners();

//newCardAdd.setEventListeners();

/*const openPopup = (popup) => {
  const newPopup = new Popup(popup);
  const elementPopup = newPopup.open();
  return elementPopup;
}*/
/*/ Функция создания карточки
const createCard = (item) =>{
  const card = new Card(item, '#card-template', handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
};*/

/* Функция добавления карточки через форму ("Submit")
const addNewCard = (item) => {
  //const element = generateCard(dataCard);
  cardsContainer.prepend(createCard(item));
};*/

//*-- Функция создания новой валидации
const createValidator = (formSelector) => {
  const validator = new FormValidator (validationObj, formSelector);
  return validator;
};

//*-- Валидация формы редактирования профиля
const formProfileEditValidator = createValidator(formProfileEdit);
formProfileEditValidator.enableValidation();


//*-- Валидация формы добавления карточки
const addCardFormValidator = createValidator(formAddCard);
addCardFormValidator.enableValidation();

//*-- Функция открытия попапа с картинкой
export const handleImageClick = (nameAdd, imageAdd) => {
  imgPopupZoom.src = imageAdd;
  imgPopupZoom.alt = nameAdd;
  imgTitlePopupZoom.textContent = nameAdd;
  //openPopup(zoomPopup);
  newPopup.renderer(zoomPopup);
};

//* Функция заполнения полей "инпут"
const fillProfile = () =>{
  formNameInput.value = popuProfileName.textContent;
  formAboutInput.value = popuProfileActivity.textContent;
};

//*  функция сохранения (отправки) введённых данных для сохранения новых значений в попапе редактора профиля
const handleSubmitFormProfile = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formPlaceNameInput.value,
    link: formPlaceLinkInput.value
  };
  newCardAdd.renderer(cardData);
  closePopup(popupNewCardAdd);
  evt.target.reset();
};

//*  Функция сохранения (отправки) введённых данных для добавления карточки
const handleSubmitFormAddCard = (evt) => {
  evt.preventDefault();//* метод присваивает выбранные значения
  popuProfileName.textContent = formNameInput.value;
  popuProfileActivity.textContent = formAboutInput.value;
  closePopup(popuProfileEdit);
};

/*/ Реализуем работу не через "переключатель", а через разные функции:
const openPopup = (popup) => {
  console.log(popup);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};*/

// Функция открытия попапа редактора профиля
const openPopupProfile = () => {
  fillProfile();
  //resetErrs(popuProfile, validationObj);
  formProfileEditValidator.resetErrs();
  formProfileEditValidator.handleBtnCheckValidity();
  newPopup.renderer(popuProfileEdit);
};

// Функция открытия попапа добавления карточки
const openPopupAddNewCard = () =>{
  newPopup.renderer(popupNewCardAdd);
};

// Слушатель кнопки редактора профиля
popupProfileButtonOpen.addEventListener(CLICK, openPopupProfile);

// Слушатель кнопки новой карточки
popupCardButtonOpen.addEventListener(CLICK, openPopupAddNewCard);

/* -- Функция закрытия попапа при клике в крестик или оверлей
const closePopupByClick = (e) => {
  if (e.target === e.currentTarget || e.target.classList.contains('popup__close-btn')) {
    closePopup(e.currentTarget);
    //close();
  }
};

//* -- Функция закрытия попапа клавишей ESC
const closePopupByEsc = (e) => {
  if (e.key === escButton) {
    closePopup(document.querySelector('.popup_opened'));
    //close();
  }
};*/

//здесь был слушатель, на все кнопки сразу, теперь он в таком виде уже не нужен, так как мы добавляем один слушатель для всего класса
//popups.forEach((popup) => popup.addEventListener(CLICK, closePopupByClick));

formAddCard.addEventListener('submit', handleSubmitFormProfile);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "handleSubmitFormProfile"

formProfileEdit.addEventListener('submit', handleSubmitFormAddCard);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"

  //console.log('end index js');

cardAdd.renderItems();