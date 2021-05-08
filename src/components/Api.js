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
      });
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
      });
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
      });
  }
  // другие методы работы с API
}
