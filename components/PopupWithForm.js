import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    this._form = this._selector.querySelector('.popup__form') 
  }

  _getInputValues(){

  }

  setEventListeners(){

  }

  close() {
    super.close();

    this._form.reset();
  }


}