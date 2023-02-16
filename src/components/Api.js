export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options._baseUrl;
    this._headers = this._options._headers;
  };

  _checkRes(res) {
    if(!res.ok){
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  _refund(url, options) {
    return fetch(url, options).then(this._checkRes)
  };

  getUserInfo() {
    return this._refund(`${this._baseUrl}/users/me`,
     {headers: this._headers});
  }

  getInitCards() {
    return this._refund(`${this.baseUrl}/cards`, {
      headers: this._headers
    });
  }
}