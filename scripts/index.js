/*   Премногоуважаемый ревьюер, здравствуй!
    Во-первых, благодарю Вас за Ваш труд!  Я пока не представляю, КАК! Вы это делаете! У меня бывают трудности разобраться в том, что я сам написал, а в чужом коде.... В общем , моё Вам уважение! 
    А во-вторых, сразу прошу прощения за ява-скрипт! Я смотрю на этот код и понимаю, да, он (вроде бы) работает, но мне самому не очень нравится, как он структурирован, точнее он вообще получился не структурирован и с огромным количеством коментариев. Я всё знаю про коментарии, что надо писать только то, что необходимо, и чем короче, тем лучше, но это мой первый код, и я коментарии писал для себя (как для утёнка), чтобы лучше вникнуть во все взаимодействия функций и методов. Конечно, если нужно , я всё копирну, а здесь потру. Ну и, конечно же, жду Ваших замечаний )) */

// Проверяем, что подключили скрипт и он работает
//console.log('Hello, world !');

// Делаем выборку ДОМ элементов:
//  Глобальные переменные:
//  для работы с попАп:
const popupElements = document.querySelectorAll('.popup');//* здесь назначили переменную, которая работает со всеми блоками '.popup'
const popupCloseBtnElements = document.querySelectorAll('.popup__close-btn');//* здесь назначили все кнопки закрытия попАпов
const profileEditElement = document.querySelector('.popup_profile');//* эта переменная добавляет класс открытия попапу профиля при клике
const newCardAddElement = document.querySelector('.popup_new-card');//* эта переменная добавляет класс открытия попапу новой карточки при клике

//--  Переменные для  профиля
const profileElement = document.querySelector('.profile');//* назначаем конкретный блок - профиль 
const profileNameElement = profileElement.querySelector('.profile__user-name');//* имя в профиле
const profileActivityElement = profileElement.querySelector('.profile__user-activity');//* хобби в профиле
const profileBtnOnElement = profileElement.querySelector('.profile__edit-btn');//* кнопка "включения" профиля
const cardAddBtnElement = profileElement.querySelector('.profile__add-btn');//* кнопка добавления нового профиля

//--  Переменные для работы с формой профиля:
const formEditElement = document.querySelector('.popup__form-edit');//* окно редактирования профиля
const nameInputElement = formEditElement.querySelector('.popup__form-input_other-name');//* окно редактирования имени
const aboutInputElement = formEditElement.querySelector('.popup__form-input_other-about');//* окно редактирования хобби

//--  Переменные для работы с формой карточек:
const formAddCardElement = document.querySelector('.popup__form-new-card');
const inPlaceNameElement = formAddCardElement.querySelector('.popup__form-input_place-name');
const inPlaceLinkElement = formAddCardElement.querySelector('.popup__form-input_link');

//--  Переменные для зум-контейнера
const zoomContainer = document.querySelector('.popup_zoom');//* весь контейнер зум
const imgPopupElement = zoomContainer.querySelector('.popup__img');//* переменная для хранения изображения
const imgTitlePopupElement = zoomContainer.querySelector('.popup__img-title');//* переменная для хранения названия изображения

//--  Переменные для Card и Template
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

//=== Add massive & render all cards ===//

const initialCards = [

  {
    name: 'Улан-Удэ',
    link: './images/Улан-Удэ.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Гора_Эльбрус.png',
  },
  {
    name: 'Домбай',
    link: './images/Домбай.png',
  },
  {
    name: 'Сулак',
    link: './images/Сулак.jpg',
  },
  {
    name: 'Байкал',
    link: './images/Байкал.jpg',
  },
  {
    name: 'Судак',
    link: './images/Судак.jpg',
  },
];
//========================================================
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

  imageAdd.addEventListener('click', zoomPopupHandler);
  cardLikeBtn.addEventListener('click', likeTglElement);
  trashBox.addEventListener('click', delCard);
  
  return newCard;
};

const zoomPopupHandler = (evt) => {
  imgPopupElement.src = evt.target.src;
  imgPopupElement.alt = evt.target.closest('.card').querySelector('.card__title').textContent;
  imgTitlePopupElement.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(zoomContainer);
}

//Функция добавления лайка
const likeTglElement = (evt) => {
  evt.target.classList.toggle('card__like-btn_on');
}

// Функция "карточка в мусор"
const delCard = (evt) => {
  evt.target.closest('.card').remove();
}


//* Функция добавления карточки через форму ("Submit")
const addNewCard = (dataCard, newElement) => {
  const element = generateCard(dataCard);
  newElement.prepend(element);
}

//* Функция заполнения полей "инпут"
const profileFillers = () =>{
  nameInputElement.value = profileNameElement.textContent;
  aboutInputElement.value = profileActivityElement.textContent;
}

//*  Функция сохранения (отправки) введённых данных для добавления карточки
const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const addNewCardElement = {
    name: inPlaceNameElement.value,
    link: inPlaceLinkElement.value
  };
  addNewCard(addNewCardElement, cardsContainer);
  closePopup();
  evt.target.reset();
}

//*  функция сохранения (отправки) введённых данных для сохранения новых значений в попапе редактора профиля
const formProfileSubmitHandler = (evt) => {
  evt.preventDefault();//* метод присваивает выбранные значения
  profileNameElement.textContent = nameInputElement.value;
  profileActivityElement.textContent = aboutInputElement.value;
  closePopup();
}

// Реализуем работу не через "переключатель", а через разные функции:
//* openPopup -это общая функция открытия любого попАпа. "evt" мы назначаем сами, это может быть "е" или любое другое имя, указывается для того, чтобы функция "видела" какой из элементов на странице её вызвал.
const openPopup = (evt) => {
  evt.classList.add('popup_opened');
}

//* closePopup принимает на вход любую кнопку (на закрытие) и методом "forEach" перебирает весь массив "popupElements" и в каждом елементе удаляет(remove) модификатор ('popup_opened')(без точки т.к. это именно класс а не селектор)
const closePopup = () => {
  popupElements.forEach(function(element){
    element.classList.remove('popup_opened');
  })
}

//* функция "слушает" конкретную кнопку(методом addEventListener), в данном случае кнопку редактирования профиля и при клике вызывает функцию "openPopup",передавая ей параметром "(profileEditElement)", элемент в котором отработает функция., а "(evt)" указывает конкретную кнопку.
profileBtnOnElement.addEventListener('click',() => {
  openPopup (profileEditElement);
  profileFillers();
});

//
cardAddBtnElement.addEventListener('click', () => openPopup(newCardAddElement) );//* То-же , что и выше, на кнопку добавления новой карточки

//* закрытие всех попапов я решил организовать при помощи метода forEach:  мы "слушаем" клик на всех кнопках закрытия любого попАпа
popupCloseBtnElements.forEach( (evt) => evt.addEventListener('click', closePopup) );

formAddCardElement.addEventListener('submit', formAddCardSubmitHandler);//* слушаем кнопку "создать" в попапе редактора профиля. При нажатии (событие'submit')выполнить функцию "formAddCardSubmitHandler"

formEditElement.addEventListener('submit', formProfileSubmitHandler);//* слушаем кнопку "сохранить" в попапе редактора профиля. При нажатии ('submit')выполнить функцию "formProfileSubmitHandler"

//Внимание! инициируем ниже функций!
initialCards.forEach((dataCard) => {
  const newCardAdd = generateCard(dataCard);
  cardsContainer.append(newCardAdd);
});

//  console.log('end script');