// Проверяем, что подключили скрипт и он работает
//console.log('Hello, world !');
// Делаем выборку ДОМ элементов

const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-btn');
const popupOpenBtnElement = document.querySelector('.profile__edit-btn');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

console.log(cardTemplate);

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
//-----AddCards (Добавляем карточки)
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const imageAdd = newCard.querySelector('.card__image'); 
  const nameAdd = newCard.querySelector('.card__title');
  //var like toggle
  const cardLikeBtn = newCard.querySelector('.card__like-btn');
  const trashBox = newCard.querySelector('.card__del-btn');
  console.log(trashBox);

  imageAdd.src = dataCard.link;
  nameAdd.textContent = dataCard.name;
  imageAdd.alt = 'картинка ' + dataCard.name;

  //cardLikeBtn.addEventListener('click', likeTglElement);
  //trashBox.addEventListener('click', );
  
  return newCard;
};

initialCards.forEach((dataCard) => {
const newCardAdd = generateCard(dataCard);
cardsContainer.prepend(newCardAdd);
});

//Функция добавления лайка
const likeTglElement = (evt) => {
  evt.target.classList.toggle('card__like-btn_on');
}


// Реализуем работу не через "переключатель", а через разные функции:

const openPopup = function() {
  popupElement.classList.add('popup_opened');

  nameInput.value = profileName.textContent;

  jobInput.value = profileJob.textContent;

  console.log(nameInput.textContent);

}

const closePopup = function() {
  popupElement.classList.remove('popup_opened')
}

// Регистрируем обработчики событий по-клику

popupOpenBtnElement.addEventListener('click', openPopup);

popupCloseBtnElement.addEventListener('click', closePopup);

// Как работают функции обратного вызова (на упрощённом примере)

//======================================================================
// РАБОТА С ФОРМОЙ

let formElement = popupElement.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__form-input_other-name');

let jobInput = formElement.querySelector('.popup__form-input_other-about');

let profileName = document.querySelector('.profile__user-name');

let profileJob = document.querySelector('.profile__user-activity');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;

  profileJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
//  console.log('end script');