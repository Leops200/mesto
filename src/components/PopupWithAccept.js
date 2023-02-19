import Popup from "./Popup";

export class PopupWithAccept extends Popup {
  constructor(popupSelector, cardDelHandler) {
    super(popupSelector);
    this._cardDelHandler = cardDelHandler;
    this._form = this._popup.querySelector('.popup__form');
    this.button = this._form.querySelector('.popup__form-btn-save');
    this._buttonText = this.button.textContent;
  };

  open(cardItem) {
    this._card = cardItem;
    super.open();
  };

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const initText = this._button.textContent;
      this._button.textContent = 'Удаление...';
      this._cardDeleteHandler(this._card)
        .then(() => this.close())
        .catch((err) => {console.log('Ошибка ' + err)})
        .finally(() => {this._button.textContent = initText;})
    });
    super.setEventListeners();
  };
}