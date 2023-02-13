import Popup from './Popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__img-title');
  }
  
  open(name, src) {

    this._imagePopup.src = src;
    this._imagePopup.alt = name;
    this._popupTitle.textContent = name;

    super.open();
  };
};