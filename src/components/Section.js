export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(initialCards) {
    initialCards.forEach(this._renderer);
  };

  addItem(element) {
    this._container.prepend(element);
  };
};
/*
  constructor({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;// it's function
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }*/