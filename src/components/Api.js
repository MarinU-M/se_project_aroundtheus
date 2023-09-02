export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }
  getUsersInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        method: "GET",
        authorization: this._authorization,
      },
    }).then((res) => this._checkServerResponse(res));
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        method: "GET",
        authorization: this._authorization,
      },
    }).then((res) => this._checkServerResponse(res));
  }

  editProfile(obj) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    }).then((res) => this._checkServerResponse(res));
  }

  addNewCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    }).then((res) => this._checkServerResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkServerResponse(res));
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkServerResponse(res));
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkServerResponse(res));
  }

  editProfilePhoto() {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkServerResponse(res));
  }
}
