class Api {
  constructor(baseUrl, headers) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = this._headers[authorization];
    this._type = this._headers["Content-Type"];
  }

  getInitialCards() {
    return fetch(this._baseUrl, this._headers)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6d3d8659-087c-48a4-9b8b-b1f3f711b21d",
    "Content-Type": "application/json",
  },
});
