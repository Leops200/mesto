/*
  Спасибо.
  С уважением, Леонид.*/

import {popups} from './constants.js';
import {popuProfileEdit} from './constants.js';
import {popupNewCardAdd} from './constants.js';
import {popuProfile} from './constants.js';
import {popuProfileName} from './constants.js';
import {popuProfileActivity} from './constants.js';
import {popupProfileButtonOpen} from './constants.js';
import {popupCardButtonOpen} from './constants.js';
import {formProfileEdit} from './constants.js';
import {formNameInput} from './constants.js';
import {formAboutInput} from './constants.js';
import {formAddCard} from './constants.js';
import {formPlaceNameInput} from './constants.js';
import {formPlaceLinkInput} from './constants.js';
import {zoomPopup} from './constants.js';
import {imgPopupZoom} from './constants.js';
import {imgTitlePopupZoom } from './constants.js';
import {cardsContainer} from './constants.js';
import {cardTemplate} from './constants.js';
import {validationObj} from './constants.js';
import {initialCards} from './constants.js';
import {enableValidation} from './validate.js';
import {resetErrs} from './validate.js';
import {escButton} from './constants.js';
import { CLICK } from './constants.js';

//========================================================


enableValidation(validationObj);

class Card {
  constructor(initialCards, templateSelector, handleImageClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }
  //* Слушатель событий на карточке
  _setEventListeners(imageAdd, cardLikeBtn, trashBtn) {
    imageAdd.addEventListener(CLICK, () => {
      this._handleImageClick(this._name, this._link);
    });
    cardLikeBtn.addEventListener(CLICK, () => {
      this._handleLikeClick(cardLikeBtn);
    });
    trashBtn.addEventListener(CLICK, () => {
      this._deletedCard();
    });
  }
  //* Функция получения шаблона
  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }
  //* Функция создания карточки
  generateCard(){
    this._element = this._getTemplate();
    const imageAdd = this._element.querySelector('.card__image');
    const cardLikeBtn = this._element.querySelector('.card__like-btn');
    const trashBtn = this._element.querySelector('.card__del-btn');
    const nameAdd = this._element.querySelector('.card__title');
    nameAdd.textContent = this._name;
    imageAdd.src = this._link;
    imageAdd.alt = /*'картинка ' + */this._name;
    this._setEventListeners(imageAdd, cardLikeBtn, trashBtn);
    return this._element;
  }
  //* Функция удаления карточки
  _deletedCard() {
    this._element.remove();
  }
  //* Функция переключателя лайка
  _handleLikeClick(cardLikeBtn) {
    cardLikeBtn.classList.toggle('card__like-btn_on');
  }
};

const handleImageClick = (nameAdd, imageAdd) => {
  imgPopupZoom.src = imageAdd;
  imgPopupZoom.alt = nameAdd;
  imgTitlePopupZoom.textContent = nameAdd;
  openPopup(zoomPopup);
}

// Функция создания карты
const createCard = (item) =>{
  const card = new Card(item, '.card-template', handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});
/*
//*---  Добавляем карточки
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  //const imageAdd = newCard.querySelector('.card__image'); 
  const nameAdd = newCard.querySelector('.card__title');
  //--  переменные для тумблера лайков
  const cardLikeBtn = newCard.querySelector('.card__like-btn');
  const trashBox = newCard.querySelector('.card__del-btn');
  
  //imageAdd.src = dataCard.link;
  nameAdd.textContent = dataCard.name;
  //imageAdd.alt = 'картинка ' + dataCard.name;

  //imageAdd.addEventListener(CLICK, () => {
    //handleImageClick(nameAdd, imageAdd)
  //});
  cardLikeBtn.addEventListener(CLICK, handleLikeClick);
  trashBox.addEventListener(CLICK, deletedCard);
  
  return newCard;
};
*/
//Функция добавления лайка
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('card__like-btn_on');
};

// Функция "карточка в мусор"
const deletedCard = (evt) => {
  evt.target.closest('.card').remove();
};

//* Функция добавления карточки через форму ("Submit")
const addNewCard = (dataCard, cardContainer) => {
  const element = generateCard(dataCard);
  cardContainer.prepend(element);
};

//* Функция заполнения полей "инпут"
const fillProfile = () =>{
  formNameInput.value = popuProfileName.textContent;
  formAboutInput.value = popuProfileActivity.textContent;
};

//*  Функция сохранения (отправки) введённых данных для добавления карточки
const handleSubmitFormProfile = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formPlaceNameInput.value,
    link: formPlaceLinkInput.value
  };
  addNewCard(cardData, cardsContainer);
  closePopup(popupNewCardAdd);
  evt.target.reset();
};

//*  функция сохранения (отправки) введённых данных для сохранения новых значений в попапе редактора профиля
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
}


//* функция "слушает" конкретную кнопку(методом addEventListener)
popupProfileButtonOpen.addEventListener(CLICK, () => {
  fillProfile();
  resetErrs(popuProfile, validationObj);
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

const closePopupByEsc = (e) => {
  if (e.key === escButton) {
    closePopup(document.querySelector('.popup_opened'))
  }
} 

popups.forEach((popup) => popup.addEventListener(CLICK, closePopupByClick));

formAddCard.addEventListener('submit', handleSubmitFormProfile);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "handleSubmitFormProfile"

formProfileEdit.addEventListener('submit', handleSubmitFormAddCard);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"

//Внимание! инициируем ниже функций!
/*
initialCards.forEach((dataCard) => {
  const newCardAdd = generateCard(dataCard);
  cardsContainer.append(newCardAdd);
});
*/
  console.log('end index js');