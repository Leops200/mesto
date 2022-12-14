/*
Здравствуйте, Станислав! 
Спасибо Вам за Вашу работу. Отдельная благодарность за пояснения к замечаниям. Про неиспользуемые функции я помнил, но поторопился отправить работу на проверку и вылетело из головы, извините. А сейчас, вроде, всё поправил.
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
} from './constants.js';

//*--
import {initialCards} from './constants.js';
//*--
import {validationObj} from './constants.js';
//*--
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//========================================================

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
const handleImageClick = (nameAdd, imageAdd) => {
  imgPopupZoom.src = imageAdd;
  imgPopupZoom.alt = nameAdd;
  imgTitlePopupZoom.textContent = nameAdd;
  openPopup(zoomPopup);
};

// Функция создания карточки
const createCard = (item) =>{
  const card = new Card(item, '#card-template', handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
};
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

//* Функция добавления карточки через форму ("Submit")
const addNewCard = (item) => {
  //const element = generateCard(dataCard);
  cardsContainer.prepend(createCard(item));
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
  addNewCard(cardData);
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

// Реализуем работу не через "переключатель", а через разные функции:
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};


//* функция "слушает" конкретную кнопку(методом addEventListener)
popupProfileButtonOpen.addEventListener(CLICK, () => {
  fillProfile();
  //resetErrs(popuProfile, validationObj);
  formProfileEditValidator.resetErrs();
  formProfileEditValidator.handleBtnCheckValidity();
  openPopup(popuProfileEdit);
});

//* То-же , что и выше, на кнопку добавления новой карточки
popupCardButtonOpen.addEventListener(CLICK, () => {
  openPopup(popupNewCardAdd);
});

//* -- Функция закрытия попапа при клике в крестик или оверлей
const closePopupByClick = (e) => {
  if (e.target === e.currentTarget || e.target.classList.contains('popup__close-btn')) {
    closePopup(e.currentTarget);
  }
};

//* -- Функция закрытия попапа клавишей ESC
const closePopupByEsc = (e) => {
  if (e.key === escButton) {
    closePopup(document.querySelector('.popup_opened'))
  }
};

popups.forEach((popup) => popup.addEventListener(CLICK, closePopupByClick));

formAddCard.addEventListener('submit', handleSubmitFormProfile);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "handleSubmitFormProfile"

formProfileEdit.addEventListener('submit', handleSubmitFormAddCard);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"

  //console.log('end index js');