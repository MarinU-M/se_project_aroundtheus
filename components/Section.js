export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    console.log(this._items);
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
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
