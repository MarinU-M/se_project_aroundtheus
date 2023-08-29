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

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "6d3d8659-087c-48a4-9b8b-b1f3f711b21d",
//     "Content-Type": "application/json",
//   },
// });
