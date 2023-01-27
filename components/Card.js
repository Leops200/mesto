export class Card {
  constructor(initialCards, templateSelector, handleImageClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }
  //* Слушатель событий на карточке
  _setEventListeners = () => {
    this._imageAdd.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleLikeClick(this._cardLikeBtn);
    });
    this._trashBtn.addEventListener('click', () => {
      this._deletedCard();
    });
  }
  //* Функция получения шаблона
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }
  //* Функция создания карточки
  generateCard(){
    this._element = this._getTemplate();
    this._imageAdd = this._element.querySelector('.card__image');
    this._cardLikeBtn = this._element.querySelector('.card__like-btn');
    this._trashBtn = this._element.querySelector('.card__del-btn');
    this._nameAdd = this._element.querySelector('.card__title');

    this._nameAdd.textContent = this._name;
    this._imageAdd.src = this._link;
    this._imageAdd.alt = 'картинка ' + this._name;

    this._setEventListeners();

    return this._element;
  }
  //* Функция удаления карточки
  _deletedCard() {
    this._element.remove();
    this._element = null;// спасибо, буду иметь в виду(в теории, вроде, так не делали)
  }
  //* Функция переключателя лайка
  _handleLikeClick() {
    this._cardLikeBtn.classList.toggle('card__like-btn_on');
  }
};