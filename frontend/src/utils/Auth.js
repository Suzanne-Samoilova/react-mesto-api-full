class Auth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(this._handleResponse)
    }

    authorize(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(this._handleResponse);
    }

    tokenCheck(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`
            }
        }).then(this._handleResponse)
    }
}

export const auth = new Auth({
    baseUrl: 'https://api.mesto.suz.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
});
