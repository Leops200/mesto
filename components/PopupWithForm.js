import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);

    this._handleSubmit = handleFormSubmit;
    this._form = this._selector.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__form-input');
  };

  // записываем значения полей формы
  _getInputValues(){
    // создали объект
    const values = {};
    //перебрали и сохранили в него значения полей
    this._inputs.forEach(element => {
      const name = element.name;
      const value = element.value;

      values[name] = value;
    });
    return values;
  };

// обработка на крестик и сабмит формы
  setEventListeners(){
    super.setEventListeners();
      this._form.addEventListener('submit', (e) =>{
      this._handleSubmit(e, this._getInputValues());
    });
  };

  setFormVal(values){
    this._inputs.forEach(input => {
      const name = input.name;
      if(values[name]){
        input.value = values[name]
      };
    });
  };

  close() {
    super.close();

    this._form.reset();
  };
};