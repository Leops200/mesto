/*
Уважаемый ревьюер, здравствуте! Сразу хочу поблагодарить Вас за Ваш труд, он очень важен для такого новичка, как я. Ваши коментарии помогают лучше понять что и как лучше и правильнее делать, и многого из того, что вы пишете, в теории просто нет... Спасибо!! 

И так же, сразу, Хочу извиниться что сдаю на проверку не доделанную работу. Так сложились обстоятельства, что не хватило времени, а переходить в другую когорту уж очень не хочется. Простите пожалуйста. Я знаю, что у меня не весь функционал работает корректно, а кое что, например счётчик лайков, вообще не реализовался пока. Я работаю над этим. Обещаю сегодня - завтра буду очень стараться всё добить. 
Ещё раз, спсибо за понимание, и извините...  
*/

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
];
*/
//*-- Импорты:
import{
  // - элементы ДОМ
  popupProfileButtonOpen,
  popupCardButtonOpen,
  formProfileEdit,
  formEditAvatar,
  formAddCard,
  formNameInput,
  formAboutInput,
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
import { PopupWithAccept } from '../components/PopupWithAccept.js';
import { Api } from '../components/Api.js';
//========================================================

const userInfo = new UserInfo({
  nameSelector: '.profile__user-name',
  activSelector: '.profile__user-activity',
  avatarSelector: ".profile__avatar"
});
//пароль и логин для сайта
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "f12b044f-995b-4f4a-bc14-fbb855775aa8",
    "Content-Type": "application/json",
  },
});
console.log(api);

//собираем карточку
const createCard = (item) => {
  const card = new Card(item, userInfo.getUserId(),'#card-template', {
    handleImageClick: (name, link) => {
      newPopupWithImage.open(name, link);
    },
    handleLikeClick: () => {//обработка клика лайка
      const id = card.getCardId();
      const isLiked = card.checkLikes();
      const resApi = isLiked ? api.deleteCardLike(id) : api.addCardLike(id);
      resApi
      .then((initialCards) => {
        card.setLikes(initialCards);
        card.countLikes();
      })
      .catch((err) => {console.log('Err: ' + err);});
    },
    handleDelClick: () => {//обработка клика по ведру
      console.log('ведро!!');
      popupWithAccept.open(card);
    }
  } );
  return card.generateCard();
}

const handleDelCard = async (card) => {
  const id = card.getCardId();
  try{await api.deleteCard(id);
      popupWithAccept.close();
      card.deleteCard();
    } catch(err){console.log('Str95 err' + err);}
};

// Попап подтверждения удаления карточки
const popupWithAccept = new PopupWithAccept('.popup_accept', handleDelCard);
popupWithAccept.setEventListeners();

// Функция сбора данных с сервера
Promise.all([api.getUserInfo(), api.getInitCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    cardAdd.renderItems(initialCards.reverse());
    console.log('data: ');
    console.log(data);
    })
  .catch((err) => {console.log('Ошибка: ' + err);}
  );

  const cardAdd = new Section({
    //items: initialCards.reverse(),
    renderer: (item) =>{
      //const cardElement = createCard(item)
      cardAdd.addItem(createCard(item));
    },
  }, cardsContainer);
  
//Валидируем форму добавления карточек
const newCardCheckValid = new FormValidator (validationObj, formAddCard);
newCardCheckValid.enableValidation();

// попап добавления новой карточки
const handleAddCard = new PopupWithForm({
  handleFormSubmit: async (card) => {
    try{const data = await api.addNewCard(card);
      console.log("card");
      cardAdd.addItem(createCard(data));
    }catch(err) {console.log('Ошибка: ' + err);}
  },
},
  '.popup_new-card'/*, handleSubmitFormAddCard*/);
handleAddCard.setEventListeners();

//Валидируем форму редактора профиля
const profileCheckValid = new FormValidator (validationObj, formProfileEdit);
profileCheckValid.enableValidation();

const profileEdit = new PopupWithForm({
  handleFormSubmit: async (data) => {
    try{const dataNew = await api.addInfo(data);
      userInfo.setUserInfo(dataNew);
    }catch(err) {console.log('Ошибка: ' + err);}
  },
},
  '.popup_profile');
profileEdit.setEventListeners();

// Валидируем форму аватарки 
const avatarCheckValid = new FormValidator (validationObj, formEditAvatar);
avatarCheckValid.enableValidation();

const newPopupWithImage = new PopupWithImage('.popup_zoom');
newPopupWithImage.setEventListeners();

// Форма смены автарки
const avatarPopup = new PopupWithForm({
  handleFormSubmit: async (avatar) =>{
    try {const data = await api.addAvatar(avatar)
        userInfo.setUserInfo(data)
      } catch (err) {console.log(err);}
  },
}, '.popup_avatar');
avatarPopup.setEventListeners();

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

/*  Функция сохранения (отправки) введённых данных профиля
function handleEditFormProfile (e, values) {
  e.preventDefault();//* метод отменяет действие по-умолчанию
  userInfo.setUserInfo(values.name, values.about);
  profileEdit.close();
};*/

// Функция открытия попапа редактора профиля
const openPopupProfile = () => {
  const {name, about} = userInfo.getUserInfo();
  formNameInput.value = name;
  formAboutInput.value = about;
  profileCheckValid.resetErrs();
  profileEdit.open();
};

// Функция открытия попапа смены аватарки
const openChangeAvatar = () =>{
  avatarCheckValid.resetErrs();
  avatarPopup.open();
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

// Назначаем слушатель на кнопку смены аватарки
popupAvatarEditBtn.addEventListener('click', openChangeAvatar);

//cardAdd.renderItems();