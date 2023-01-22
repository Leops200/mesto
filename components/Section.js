import  {Card}  from '../components/Card.js';

export default class Section {
constructor({items, /*renderer*/}, containerSelector){
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
  }

  _renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      const card = new Card(item);

      const cardElement = card.generateCard();
      this.setItem(cardElement);
    });

  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML('');
  }
}