export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCardsFromApi() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка в получении карточек: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  getInfoAboutMeApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при получении данных профиля: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  setInfoAboutMe({ name, about }) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при обновлении данных профиля: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  getAllInitialData() {
    return Promise.all([this.getInitialCardsFromApi(), this.getInfoAboutMeApi()])
  }

  editProfileApi({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  addNewCardApi({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при добавлении новой карточки: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  removeCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  addLikeToCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при добавлении лайка: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  addAvatarToApi(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при добавлении аватара: ${res.status}`)
      })
      .catch(err => console.log(err))
  }

  removeLikeToCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при удалении лайка: ${res.status}`)
      })
      .catch(err => console.log(err))
  }
  // другие методы работы с API
}
