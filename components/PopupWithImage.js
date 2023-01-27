import Popup from './Popup.js';

export class PopupWithImage extends Popup{
  open(src, name) {
    console.log('open with image');
    const imageElement = this._selector.querySelector('.popup__img');
    //console.log(imageElement);
    const imageName = this._selector.querySelector('.popup__img-title');
    console.log(imageName);

    imageElement.src = link;
    imageElement.alt = name;
    imageName.textContent = name;

    super.open();
  };
};