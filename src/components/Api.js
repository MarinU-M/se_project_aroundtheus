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
}
