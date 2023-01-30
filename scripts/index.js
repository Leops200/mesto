//*-- Импорты:
import{
  // - элементы ДОМ
  popupProfileButtonOpen,
  popupCardButtonOpen,
  formProfileEdit,
  formAddCard,
  formPlaceNameInput,
  formPlaceLinkInput,
  // - элемент для карточек
  cardsContainer,
  // - кнопки
  CLICK
} from '../utils/constants.js';

import Section from '../components/Section.js';
//*--
import {initialCards} from '../utils/constants.js';
//*--
import {validationObj} from '../utils/constants.js';
//*--
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
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
}, cardsContainer);

const newCardAdd = new Section({
  renderer: (item) =>{
    const card = new Card(item, '#card-template', handleImageClick);
    const cardElement = card.generateCard();
    cardAdd.addNewCard(cardElement);
    //newCardAdd.setEventListeners();
  }
});

const checkValidNewCard = new FormValidator (validationObj, formAddCard);
checkValidNewCard.enableValidation();
const handleAddCard = new PopupWithForm('.popup_new-card', handleSubmitFormAddCard);
handleAddCard.setEventListeners();

const checkValidProfile = new FormValidator (validationObj, formProfileEdit);
checkValidProfile.enableValidation();
const profileEdit = new PopupWithForm('.popup_profile',(handleEditFormProfile));
profileEdit.setEventListeners();
const userInfo = new UserInfo({nameSelector: '.profile__user-name', activSelector: '.profile__user-activity'});

const newPopupWithImage = new PopupWithImage('.popup_zoom');
newPopupWithImage.setEventListeners();


//*-- Функция открытия попапа с картинкой
export const handleImageClick = (nameAdd, imageAdd) => {
  newPopupWithImage.open(nameAdd, imageAdd);
};

//*  функция сохранения (отправки) введённых данных новая карточка
function handleSubmitFormAddCard(e, data) {
  e.preventDefault();
  newCardAdd.renderer(data);
  console.log('data');
  console.log(data);
  checkValidNewCard.resetErrs();
  handleAddCard.close();
};

//*  Функция сохранения (отправки) введённых данных профиля
function handleEditFormProfile (e, values) {
  e.preventDefault();//* метод отменяет действие по-умолчанию
  userInfo.setUserInfo(values.name, values.activity);
  console.log(values.name, values.activity);
  profileEdit.close();
};

// Функция открытия попапа редактора профиля
const openPopupProfile = () => {
  console.log('//ниже открываем "profileEdit"');
  const {name, about} = userInfo.getUserInfo();
  profileEdit.setFormVal({name, about});
  console.log(name);
  console.log(about);
  checkValidProfile.resetErrs();

  profileEdit.open();
};

// Функция открытия попапа добавления карточки
const openPopupAddNewCard = () =>{
  console.log('//ниже открываем "handleAddCard"');
  console.log(handleAddCard);
  checkValidNewCard.resetErrs();
  handleAddCard.open();
};

// Назначаем слушатель на кнопку редактора профиля
popupProfileButtonOpen.addEventListener(CLICK, openPopupProfile);

// Назначаем слушатель на кнопку добавления карточки
popupCardButtonOpen.addEventListener(CLICK, openPopupAddNewCard);

cardAdd.renderItems();
/*
const debuging = (e) => {
  e.preventDefault();
  const cardData = {
    name: formPlaceNameInput.value,
    link: formPlaceLinkInput.value
  };
  //console.log(cardData);
  handleAddCard.close();
  newCardAdd.renderer(cardData);
  handleAddCard.resetErrs();
}

  //console.log('end index js');
  formAddCard.addEventListener('submit', debuging);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "handleSubmitFormProfile"

  formProfileEdit.addEventListener('submit', handleSubmitFormAddCard);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"*/