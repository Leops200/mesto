export const escButton = 'Escape'; //кнопка ESC
export default class Popup {
  constructor (popupSelector) {
    this._selector = popupSelector;
  }

  open(){
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    console.log('open in class');
  };

  closes(){
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    console.log('close in class');
  };

  setEventListeners () {
    this._selector.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target.classList.contains('popup__close-btn')){
        this.closes();
      }
    });
  };


  _handleEscClose = (e) => {
      if (e.key === escButton) {
        //closePopup(document.querySelector('.popup_opened'));
        this.closes();
      }
  };
  
};