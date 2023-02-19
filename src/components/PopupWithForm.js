import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor({handleFormSubmit}, popupSelector){
    super(popupSelector);

    this._handleSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__form-input');
    this._btnSave = this._form.querySelector('.popup__form-btn-save')
    this._btnSaveText = this._btnSave.textContent;
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

// обработка сабмитa формы
  setEventListeners(){
    super.setEventListeners();
      this._form.addEventListener('submit', (e) =>{
        e.preventDefault();
        console.log('SUBMIT!!')
        const textInit = this._btnSave.textContent;
        this._btnSave.textContent = 'Сохранение...';
        this._handleSubmit(this._getInputValues())
          .then(() => this.close())
          .catch((err) => {console.log(err)})
          .finally(() => {this._btnSave.textContent = textInit;})
      });
  };

  close() {
    super.close();

    this._form.reset();
  };
};

  /*setFormVal(values){
    this._inputs.forEach(input => {
      const name = input.name;
      if(values[name]){
        input.value = values[name]
      };
    });
  };*/