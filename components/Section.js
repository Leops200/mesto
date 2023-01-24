//import  {Card}  from '../components/Card.js';

export default class Section {
constructor({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;// it's function
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewCard(element){
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  renderNewCard(item) {
    this._renderer(item);
  }
}