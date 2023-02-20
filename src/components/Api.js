export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkRes(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

_refund(url, options) {
  return fetch(url, options).then(this._checkRes)
}

  getInitCards() {
    return this._refund(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._refund(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  addAvatar(data) {
    console.log('avatar data:');
    console.log(data);
    return this._refund(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  };

  addInfo(data) {
    return this._refund(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  };
  
  //добавляем карточку
  addNewCard(data) {
    return this._refund(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    });
  };

  deleteCard(id) {
    return this._refund(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  };

  addCardLike(cardId) {
    return this._refund(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
  };

  deleteCardLike(data) {
    return this._refund(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
  };

  /*_checkRes(res) {
    if(res.ok){
      return res.json();
    }
  return Promise.reject(res);
  }

  _refund(url, options) {
    return fetch(url, options).then(this._checkRes);
  };

  getUserInfo() {
    return this._refund(`${this._baseUrl}/users/me`,
     {headers: this._headers});
  }

  getInitCards() {
    return this._refund(`${this.baseUrl}/cards`, {
      headers: this._headers
    });
  }*/
}