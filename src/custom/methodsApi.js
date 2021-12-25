import axios from "axios";

export function isAuthorized() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    return axios({
        method: 'get',
        url: 'https://backend-front-test.dev.echo-company.ru/api/user',
        headers: {
            'Authorization': token,
        },
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}

export function login (phone, password, remember) {
    return axios({
        method: 'post',
        url: 'https://backend-front-test.dev.echo-company.ru/api/auth/login',
        data: {
            phone: phone,
            password: password,
        },
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        if (!remember) {
            window.addEventListener('unload', () => {
                localStorage.removeItem('token');
            })
        }
        return true;
    }).catch(() => {
        return false;
    });
}

export function registration (firstName, lastName, phone, password) {
    return axios({
        method: 'post',
        url: 'https://backend-front-test.dev.echo-company.ru/api/user/registration',
        data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            password: password,
        },
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        return true;
    }).catch(() => {
        return false;
    });
}