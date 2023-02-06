import Popup from './Popup.js';

export class PopupWithImage extends Popup{
  open(name, src) {
    //console.log('open with image');
    const imageElement = this._selector.querySelector('.popup__img');
    //console.log(imageElement);
    const imageName = this._selector.querySelector('.popup__img-title');
    //console.log(imageName);

    imageElement.src = src;
    imageElement.alt = name;
    imageName.textContent = name;

    super.open();
  };
};