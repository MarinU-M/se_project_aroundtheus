export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }

  addItem(element) {
    this._classSelector.append(element);
  }

  renderItems() {
    this._items.forEach(this._renderer);
    //     (item) => {
    //   this._renderer(item);
    //   this.addItem(item);
    // });
  }
}
