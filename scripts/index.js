/* Здравствуйте, Павел! Ещё раз спасибо Вам за Вашу работу, она очень важна для таких новичков, как я!

Подправил, вроде всё работает теперь, почти как раньше. 
Единственное, кнопка при открытии редактора профиля в попап - неактивна, 
если не менялись поля. Не знаю пока, как правильно. В задании, вроде, нет акцента на этом моменте, а как по-мне: если ничего не менял, то и пересохранять необходимости нет. (если я не прав, то, конечно же, подправлю с удовольствием).

Чуть почистил от коментариев.

Спасибо. С уважением, Леонид.*/

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
import { click } from './constants.js';

//========================================================

enableValidation(validationObj);

//---  Добавляем карточки
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const imageAdd = newCard.querySelector('.card__image'); 
  const nameAdd = newCard.querySelector('.card__title');
  //--  переменные для тумблера лайков
  const cardLikeBtn = newCard.querySelector('.card__like-btn');
  const trashBox = newCard.querySelector('.card__del-btn');
  
  imageAdd.src = dataCard.link;
  nameAdd.textContent = dataCard.name;
  imageAdd.alt = 'картинка ' + dataCard.name;

  imageAdd.addEventListener(click, () => {
    handleImageClick(nameAdd, imageAdd)
  });
  cardLikeBtn.addEventListener(click, handleLikeClick);
  trashBox.addEventListener(click, deletedCard);
  
  return newCard;
};

const handleImageClick = (nameAdd, imageAdd) => {
  imgPopupZoom.src = imageAdd.src;
  imgPopupZoom.alt = nameAdd.textContent;
  imgTitlePopupZoom.textContent = nameAdd.textContent;
  openPopup(zoomPopup);
}

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
const fillingProfile = () =>{
  formNameInput.value = popuProfileName.textContent;
  formAboutInput.value = popuProfileActivity.textContent;
};

//*  Функция сохранения (отправки) введённых данных для добавления карточки
const fillingCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formPlaceNameInput.value,
    link: formPlaceLinkInput.value
  };
  addNewCard(cardData, cardsContainer);
  closePopup(document.querySelector('.popup_opened'));
  evt.target.reset();
};

//*  функция сохранения (отправки) введённых данных для сохранения новых значений в попапе редактора профиля
const handleSubmitFormAddCard = (evt) => {
  evt.preventDefault();//* метод присваивает выбранные значения
  popuProfileName.textContent = formNameInput.value;
  popuProfileActivity.textContent = formAboutInput.value;
  closePopup(document.querySelector('.popup_opened'));
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
popupProfileButtonOpen.addEventListener(click, () => {
  //console.log('klick');
  fillingProfile();
  resetErrs(popuProfile, validationObj);
  //enableValidation(validationObj);
  openPopup(popuProfileEdit);
});

//* То-же , что и выше, на кнопку добавления новой карточки
popupCardButtonOpen.addEventListener(click, () => {
  //enableValidation(validationObj); 
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

popups.forEach((popup) => popup.addEventListener(click, closePopupByClick));

formAddCard.addEventListener('submit', fillingCardSubmitHandler);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "fillingCardSubmitHandler"

formProfileEdit.addEventListener('submit', handleSubmitFormAddCard);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"

//Внимание! инициируем ниже функций!
initialCards.forEach((dataCard) => {
  const newCardAdd = generateCard(dataCard);
  cardsContainer.append(newCardAdd);
});

  //console.log('end script');