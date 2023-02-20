import Popup from "./Popup";

export class PopupWithAccept extends Popup {
  constructor(popupSelector, handleDelCard) {
    super(popupSelector);
    this._cardDelHandler = handleDelCard;
    this._form = this._popup.querySelector('.popup__form');
    this._delBtn = this._form.querySelector('.popup__form-btn-save');
    this._buttonText = this._delBtn.textContent;
  };

  open(cardItem) {
    this._card = cardItem;
    super.open();
  };

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const initText = this._delBtn.textContent;
      this._delBtn.textContent = 'Удаление...';
      this._cardDelHandler(this._card)
        .then(() => this.close())
        .catch((err) => {console.log('Ошибка ' + err)})
        .finally(() => {this._delBtn.textContent = initText;})
    });
    super.setEventListeners();
  };
}