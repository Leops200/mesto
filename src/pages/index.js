/*Решил отправить работу на проверку ещё раз. Здесь я пока не смог победить функционал смены аватарки, но, думаю, тут и без того будет много недочётоа, которые нужно будет править(Итерации есть, а вот сроки уже вышли). Ещё раз спасибо Вам за проверку. 
------------------------------------------------------------------

Здравствуте, Михаил! Спасибо Вам большое за ревью, и за большое количество зелёненьких полей, это, действительно, вселяет уверенность в своих силах. Но вот досадные ошибки выбивают из колеи...

Я, видимо, неправильно выразился выше, функционал я сделал, проверил, как меняется аватарка, но затык у меня происходит на 38 строке в файле PopupWithForm. Не могу понять почему в функцию _handleFormSubmit прилетают пустые поля из попапа.Если физически кликнуть на аватарку, ввести адрес картинки, и нажать сохранить - на этом этапе в консоль падает ошибка из асинхронной функции (строка 163 этого файла), и форма остаётся открытой, соответственно в api отсюда ничего не приходит, и аватарка не меняется. В группу вопрос задал, но все молчат. А сам тредий день уже не вижу где, чего я упускаю...

Вот, только что увидел, что эта ошибка вообще из другой асинхронной функции - из функции редактора профиля, а не из редактора аватара почему-то..

Пока писал этот комментарий - разобрался....))) Спасибо Вам!

Ваши замечания , конечно же , поправил, хотя, вижу есть ещё над чем можно поработать)) 
*/

//https://i.imgur.com/XWOuu8G.gifhttps://i.imgur.com/XWOuu8G.gif
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
  formAvatarLinkInput,
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

//собираем карточку
const createCard = (item) => {
  const card = new Card(item, userInfo.getUserId(),'#card-template', {
    handleImageClick: (name, link) => {
      newPopupWithImage.open(name, link);
    },
    handleLikeClick: () => {//обработка клика лайка
      const id = card.getCardId();
      const isLiked = card.checkLikes();
      console.log(isLiked);
      const resApi = isLiked ? api.deleteCardLike(id) : api.addCardLike(id);
      resApi
      .then((initialCards) => {
        card.setLikes(initialCards);
        card.countLikes();
      })
      .catch((err) => {console.log('Err: ' + err);});
    },
    handleDelClick: () => {//обработка клика по ведру
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
    } catch(err){console.log(err);}
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
    try{console.log('data');
      console.log(data);
      const dataNew = await api.addInfo(data);
      userInfo.setUserInfo(dataNew);
    }catch(err) {console.log(err);}
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
const avatarPopup = new PopupWithForm ({
  handleFormSubmit: async (avatar) => {
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

/*  функция сохранения (отправки) введённых данных новая карточка
function handleSubmitFormAddCard(e, values) {
  e.preventDefault();
  const cardData = {
    name: values['card-name'],
    link: values['img-url']
  };
  const cardElement = createCard(cardData)
  cardAdd.addItem(cardElement);
  handleAddCard.close();
};*/

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