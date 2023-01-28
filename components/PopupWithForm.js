import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    this._form = this._selector/*.querySelector('.popup__form')*/;
    this._inputs = this._form/*.querySelectorAll('.popup__form-input')*/;
  };

  // записываем значения полей формы
  _getInputValues(){
    // создали объект
    const values = {};
    //перебрали и сохранили в него значения полей
    this._inputs.array.forEach(element => {
      const value = element.value;
      const name = element.name;

      values[name] = value;
    });
    return values;
  }
// обработка на крестик и сабмит формы
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (e) =>{
      this._handleSubmit(e, this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  };
};