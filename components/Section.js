export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
    console.log(this._classSelector);
  }

  addItem(element) {
    this._classSelector.append(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
