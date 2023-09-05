export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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
    }).then(this._checkServerResponse);
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        method: "GET",
        authorization: this._authorization,
      },
    }).then(this._checkServerResponse);
  }

  getAPIInfo() {
    return Promise.all([this.getUsersInfo(), this.getCardList()]);
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
    }).then(this._checkServerResponse);
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
    }).then(this._checkServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then(this._checkServerResponse);
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then(this._checkServerResponse);
  }

  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then(this._checkServerResponse);
  }

  editProfilePhoto(obj) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: obj.link,
      }),
    }).then(this._checkServerResponse);
  }
}
