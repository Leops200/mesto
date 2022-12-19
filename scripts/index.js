/* Здравствуйте, Павел! Ещё раз спасибо Вам за Вашу работу, она очень важна для таких новичков, как я!
  Отдельное Вам спасибо за подробное объяснение по работе функций! Я бы с удовольствием у Вас учился! Даже в тренажёре не было рассказано о таких тонкостях. А Ваша подсказка с функцией закрытия по-клику в оверлей или по-крестику - это ж на мой взгляд гениально!  Спасибо Вам. Спасибо!!!
Спасибо. С уважением, Леонид.

По-поводу названий функций- у меня явно не хватает знаний английского. (стандартный базовый школьный курс, который у меня был 28лет назад) Видимо, придётся изучать еще и язык...

Извиняюсь за обилие коментариев. Я знаю, что их нужно минимизировать, но пока
я их оставляю больше для себя, в качестве подсказок. Если они мешают проверке - конечно я всё сохраню в отдельном файле , а тут всё почищу. Только скажите)) */

import {popups} from './constants.js';
//import {profileCloseBtn} from './constants.js';
//import {cadrAddCloseBtn} from './constants.js';
//import {zoomCloseBtn} from './constants.js';
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
/*enableValidation должна вызываться один раз в глобальной области видимости. Сейчас получается, что при открытии форм каждый раз заново запускаются все функции из модуля валидации — заново выбираются по селектору все необходимые элементы на странице, заново устанавливаются все слушатели, переназначаются все обработчики. Это относительно ресурсоемкий процесс, негативно сказывающийся на производительности.*/

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
//* openPopup -это общая функция открытия любого попАпа. "evt" мы назначаем сами, это может быть "е" или любое другое имя, указывается для того, чтобы функция "видела" какой из элементов на странице её вызвал.
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

//* closePopup принимает на вход любую кнопку (на закрытие) и методом "forEach" перебирает весь массив "popups" и в каждом елементе удаляет(remove) модификатор ('popup_opened')(без точки т.к. это именно класс а не селектор)
/*
const closePopup = () => {
  popups.forEach(function(element){
    element.classList.remove('popup_opened');
  })
};*/

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}


//* функция "слушает" конкретную кнопку(методом addEventListener), в данном случае кнопку редактирования профиля и при клике вызывает функцию "openPopup",передавая ей параметром "(popuProfileEdit)", элемент в котором отработает функция., а "(evt)" указывает конкретную кнопку.
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

/*const closePopupByEscBtn = (evt) => {
  const modalIsOpen = document.querySelector('.popup_opened');
  if (evt.key === escButton) {
    closePopup(modalIsOpen);
  }
}
*/

/* закрытие всех попапов я решил организовать при помощи метода forEach:  мы "слушаем" клик на всех кнопках закрытия любого попАпа

popupCloseBtnElements.forEach( (evt) => evt.addEventListener(click, closePopup) );
*/

/*/-- Зеркальное закрытие попапов ==============================
Необходимость в этих функциях отпала, т.к. это выполняется в функции closePopupByClick

profileCloseBtn.addEventListener(click, () => closePopup(popuProfileEdit));

cadrAddCloseBtn.addEventListener(click, () => closePopup(popupNewCardAdd));

zoomCloseBtn.addEventListener(click, () => closePopup(zoomPopup));

*///==============================================================


//* закрытие любого попапа по клавише "ESC"
/*
document.addEventListener('keydown', function(evt) {
  if (evt.key === escButton) closePopup();
});
*/

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