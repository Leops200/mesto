export class Card {
  constructor(initialCards, templateSelector, handleImageClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }
  //* Слушатель событий на карточке
  _setEventListeners(imageAdd, cardLikeBtn, trashBtn) {
    imageAdd.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
    cardLikeBtn.addEventListener('click', () => {
      this._handleLikeClick(cardLikeBtn);
    });
    trashBtn.addEventListener('click', () => {
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
    this._element = null;// спасибо, буду иметь в виду(в теории, вроде, так не делали)
  }
  //* Функция переключателя лайка
  _handleLikeClick(cardLikeBtn) {
    cardLikeBtn.classList.toggle('card__like-btn_on');
  }
};