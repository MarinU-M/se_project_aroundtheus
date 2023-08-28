export default class Api {
  constructor(url) {
    // constructor body
    this._baseUrl = url.baseUrl;
    this._authorization = url.authorization;
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "6d3d8659-087c-48a4-9b8b-b1f3f711b21d",
//     "Content-Type": "application/json",
//   },
// });
