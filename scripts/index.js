// Проверяем, что подключили скрипт и он работает
//console.log('Hello, world !');
// Делаем выборку ДОМ элементов
const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-btn');
const popupOpenBtnElement = document.querySelector('.profile__edit-btn');
//console.log(popupOpenBtnElement);

/* ниже функция - переключатель и её реализация как вариант работы
   с "переключателем". 
const togglePopupVsblt = function() {
  popupElement.classList.toggle('popup_actived');
}

//togglePopupVsblt(); // наша функция - переключатель.

//popupOpenBtnElement.addEventListener('click', togglePopupVsblt)  //выполнение
//popupCloseBtnElement.addEventListener('click', togglePopupVsblt) //переключат
*/

// Реализуем работу не через "переключатель", а через разные функции:

const openPopup = function() {
  popupElement.classList.add('popup_actived');

  nameInput.value = profileName.textContent;

  jobInput.value = profileJob.textContent;

  console.log(nameInput.textContent);

}

const closePopup = function() {
  popupElement.classList.remove('popup_actived')
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