export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._container.innerHTML = "";
    this._renderedItems.forEach(item => this._renderer(item));
  }

  setItems(items) {
    this._renderedItems = items;
  }

  addItem(element) {
    this._container.append(element);
  }
}
