import './index.css';
/*
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
];*/

//*-- Импорты:
import{
  // - элементы ДОМ
  popupProfileButtonOpen,
  popupCardButtonOpen,
  formProfileEdit,
  formAddCard,
  formAvatar,
  popupAvatarEditBtn,
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
import { PopupWithAccept } from '../components/PopupWithAccept';
import { Api } from '../components/Api';
//
//import {createCard} from '../utils/utils.js';

//========================================================

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: 'f12b044f-995b-4f4a-bc14-fbb855775aa8',
    "Content-Type": "application/json",
  },
});
console.log(api);

const renderInitCards = (cards) => {
  const cardAdd = new Section({
    items: initialCards.reverse(),
    renderer: (item) =>{
      const cardElement = createCard(item)
      cardAdd.addItem(cardElement);
    },
  }, cardsContainer);
  cardAdd.renderItems(cards);
}

Promise.all([api.getUserInfo(), api.getInitCards()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    renderInitCards(initialCards);
  })
  .catch((err) => {console.log('str 80' + err)});


const createCard = (item) => {
  const card = new Card(item, '#card-template', handleImageClick);
  const cardElement = card.generateCard();

  return cardElement
}
/*
const cardAdd = new Section({
  items: initialCards.reverse(),
  renderer: (item) =>{
    const cardElement = createCard(item)
    cardAdd.addItem(cardElement);
  },
}, cardsContainer);

const cardAdd = new Section(
    {
      renderer: (item) => {
        const newCard = createCard(item);
        const cardElement = newCard.generateCard();
        cardAdd.addItem(cardElement);
      },
    },
    cardsContainer
  );
*/

// валидируем форму с новыми карточками
const newCardCheckValid = new FormValidator (validationObj, formAddCard);
newCardCheckValid.enableValidation();

// создаём попап новой карточки
const handleAddCard = new PopupWithForm('.popup_new-card', handleSubmitFormAddCard);
handleAddCard.setEventListeners();

// валидируем форму аватарки
const avatarCheckValid = new FormValidator(validationObj, formAvatar);
avatarCheckValid.enableValidation();

// создаём попап смены аватарки
const avatarPopupForm = new PopupWithForm('.popup_avatar', handleSubmitAvatar);
avatarPopupForm.setEventListeners();

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

//*  функция сохранения (отправки) аватарки
function handleSubmitAvatar(e) {
  e.preventDefault();
  avatarPopupForm.close();
}

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

//*  функция открытия попапа аватарки
const openEditAvatar = () =>{
  avatarPopupForm.open();
  avatarCheckValid.resetErrs();
}

// Функция открытия попапа добавления карточки
const openPopupAddNewCard = () =>{
  newCardCheckValid.resetErrs();
  handleAddCard.open();
};

// Назначаем слушатель на кнопку редактора профиля
popupProfileButtonOpen.addEventListener('click', openPopupProfile);

// Назначаем слушатель на кнопку добавления карточки
popupCardButtonOpen.addEventListener('click', openPopupAddNewCard);

// Назначаем слушатель на кнопку смены аватарки
popupAvatarEditBtn.addEventListener('click', openEditAvatar);

//cardAdd.renderItems();

console.log('энд скрипт, запрос фетч');

fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
  headers: {
    authorization: 'f12b044f-995b-4f4a-bc14-fbb855775aa8'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 