class Api {
    // constructor({ baseUrl, headers }) {
    //     this._baseUrl = baseUrl;
    //     this._headers = headers;
    // }

    constructor(data) {
        this._baseUrl = data.baseUrl;
    }

    get _headers() {
        return {
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    // Обработка ответа
    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // Получить данные профиля
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    // Получить начальные карточки
    getCardList() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    // Отправить свои данные профиля
    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._handleResponse)
    }

    // Установка аватара
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._handleResponse)
    }

    // Запостить карточку
    postCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._handleResponse)
    }

    // Удалить карточку
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleResponse)
    }

    // Лайк или дизлайк
    changeLikeCardStatus(id, like) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }


    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getCardList()]);
    }
}

// export const api = new Api({
//     baseUrl: 'https://api.mesto.suz.nomoreparties.sbs',
//     headers: {
//         // authorization: '2ad13860-f9cc-4265-9332-9990cf978091',
//         authorization: `Bearer ${localStorage.getItem('jwt')}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//     }
// });

export const api = new Api(
    {
        baseUrl: 'https://api.mesto.suz.nomoreparties.sbs'
    }
);
