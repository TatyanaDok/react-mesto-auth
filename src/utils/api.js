class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialData() {
    return Promise.all([this.updateUserInfo(), this.getInitialCards()]);
  }
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  updateUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  editProfile(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,

      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }
  deleteCardFromServer(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const api = new Api({
  url: "https://api.yanadok.students.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
