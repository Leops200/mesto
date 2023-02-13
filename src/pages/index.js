/*
Здравствуйте Сергей! Спасибо большое Вам за Ваш труд. Особенно за пояснения к замечаниям, сразу понятно, почему лучше (или нужно) делать так, а не иначе. Проверьте меня, пожалуйста, ещё раз. Я, вроде, исправил все критические замечания, но, правда, не успел переделать некоторые из тех, где можно лучше. Главное, я понял суть, что сейчас мой код содержит неявную логику, которая может сбить с толку другого разработчика. Впредь буду учитывать такие моменты, спасибо.
*/

import './index.css';

const ulanude = new URL('../images/ulan_ude.jpg', import.meta.url);
import elbrus from '../images/elbrus.png';
import dombay from '../images/dombay.png';
import sulak from '../images/sulak.jpg';
import baykal from '../images/baykal.jpg';
import sudak from '../images/sudak.jpg';

const initialCards = [
  {name: 'Улан-Удэ', link: ulanude},
  {name: 'Гора_Эльбрус', link: elbrus},
  {name: 'Домбай', link: dombay},
  {name: 'Сулак', link: sulak},
  {name: 'Байкал', link: baykal},
  {name: 'Судак', link: sudak}
];
//*-- Импорты:
import{
  // - элементы ДОМ
  popupProfileButtonOpen,
  popupCardButtonOpen,
  formProfileEdit,
  formAddCard,
  // - элемент для карточек
  cardsContainer,
  
} from '../../utils/constants.js';

import Section from '../components/Section.js';
//*--
//import {initialCards} from '../../utils/constants.js';
//*--
import {validationObj} from '../../utils/constants.js';
//*--
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
//
//import {createCard} from '../utils/utils.js';

//========================================================

const createCard = (item) => {
  const card = new Card(item, '#card-template', handleImageClick);
  const cardElement = card.generateCard();

  return cardElement
}

const cardAdd = new Section({
  items: initialCards.reverse(),
  renderer: (item) =>{
    const cardElement = createCard(item)
    cardAdd.addItem(cardElement);
  },
}, cardsContainer);

const newCardCheckValid = new FormValidator (validationObj, formAddCard);
newCardCheckValid.enableValidation();
const handleAddCard = new PopupWithForm('.popup_new-card', handleSubmitFormAddCard);
handleAddCard.setEventListeners();

const profileCheckValid = new FormValidator (validationObj, formProfileEdit);
profileCheckValid.enableValidation();
const profileEdit = new PopupWithForm('.popup_profile', handleEditFormProfile);
profileEdit.setEventListeners();
const userInfo = new UserInfo({nameSelector: '.profile__user-name', activSelector: '.profile__user-activity'});

const newPopupWithImage = new PopupWithImage('.popup_zoom');
newPopupWithImage.setEventListeners();


//*-- Функция открытия попапа с картинкой
export const handleImageClick = (nameAdd, imageAdd) => {
  newPopupWithImage.open(nameAdd, imageAdd);
};

//*  функция сохранения (отправки) введённых данных новая карточка
function handleSubmitFormAddCard(e, values) {
  e.preventDefault();
  const cardData = {
    name: values['card-name'],
    link: values['img-url']
  };
  const cardElement = createCard(cardData)
  cardAdd.addItem(cardElement);
  handleAddCard.close();
};

//*  Функция сохранения (отправки) введённых данных профиля
function handleEditFormProfile (e, values) {
  e.preventDefault();//* метод отменяет действие по-умолчанию
  userInfo.setUserInfo(values.name, values.about);
  profileEdit.close();
};

// Функция открытия попапа редактора профиля
const openPopupProfile = () => {
  const {name, about} = userInfo.getUserInfo();
  profileEdit.setFormVal({name, about});
  profileCheckValid.resetErrs();
  profileEdit.open();
};

// Функция открытия попапа добавления карточки
const openPopupAddNewCard = () =>{
  newCardCheckValid.resetErrs();
  handleAddCard.open();
};

// Назначаем слушатель на кнопку редактора профиля
popupProfileButtonOpen.addEventListener('click', openPopupProfile);

// Назначаем слушатель на кнопку добавления карточки
popupCardButtonOpen.addEventListener('click', openPopupAddNewCard);

cardAdd.renderItems();