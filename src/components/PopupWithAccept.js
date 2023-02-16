import Popup from "./Popup";

export class PopupWithAccept extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this.button = this._form.querySelector('.popup__form-btn-save');
  };

  open(cardItem) {
    this._card = cardItem;
    super.open();
  };

  handlerFormSubmit(functio) {
    this._handlerFormSubmit = functio;
  };

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    })
    super.setEventListeners();
  };
}