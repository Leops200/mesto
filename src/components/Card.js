export class Card {
  constructor(data, userId, templateSelector, {handleImageClick, handleLikeClick, handleDelClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelClick = handleDelClick;
    this._handleLikeClick = handleLikeClick;
  }

  //* Слушатель событий на карточке
  _setEventListeners = () => {
    this._imageAdd.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trashBtn.addEventListener('click', () => {
      this._handleDelClick();
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
    this._likeCount = this._element.querySelector('.card__like-count');

    this._nameAdd.textContent = this._name;
    this._imageAdd.src = this._link;
    this._imageAdd.alt = 'картинка ' + this._name;

    this._setEventListeners();

    if (this._ownerId !== this._userId){
      this._trashBtn.remove();
    };
    //this._countLikes();
    this._setEventListeners();

    return this._element;
  };

  getCardId(){
    return this._cardId;
  };

  //* Функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;// спасибо, буду иметь в виду(в теории, вроде, так не делали)
  };

  _handleDelButton() {
    if (this._cardOwnerId !== this._userId) {
      this._trashBtn.remove();
    }
  }

  countLikes() {
    this._cardLikeCount.textContent = this._likes.lenght;
    this.toggleLikes();
  };
  // проверка идентификатора лайка
  checkLikes(){
    return this._likes.some((like) => like._id === this._userId);
  };

  //функция переключателя кнопки лайков
  toggleLikes(){
    if (this.checkLikes()) {
      this._cardLikeButton.classList.add("elements__button-like_active");
    } else {
      this._cardLikeButton.classList.remove("elements__button-like_active");
    }
  };

  // установки кнопки и счётчика лайка
  setLikes(initialCards) {
    this._likes = initialCards.likes;
    this._cardLikeCount.textContent = this._likes.length;
    this._handleLikeBtn();
  };

  //* Функция переключателя лайка
  _handleLikeBtn() {
    this._cardLikeBtn.classList.toggle('card__like-btn_on');
  };

};
