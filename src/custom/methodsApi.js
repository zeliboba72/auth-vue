import axios from "axios";
import store from "../store";

const httpClient = axios.create({
    baseURL: 'https://backend-front-test.dev.echo-company.ru/api/',
});

export async function checkAuth() {
    if (store.getters.isLoggedIn) {
        return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const userData = localStorage.getItem('user_data');

    if (userData) {
        const parsedUserData = JSON.parse(userData);
        store.commit('setUser', {
            username: parsedUserData.first_name,
        });
        return true;
    }

    return await addUserToStore(token);
}

async function addUserToStore(token, remember = true)
{
    try {
        const response = await httpClient.get('user', {
            headers: {'Authorization': token,}
        });
        store.commit('setUser', {
            username: response.data.first_name,
        });
        localStorage.setItem('token', token);
        localStorage.setItem('user_data', JSON.stringify(response.data));
        if (!remember) {
            window.addEventListener('unload', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user_data');
            })
        }
        return true;
    } catch (error) {
        return false;
    }
}

export async function login (phone, password, remember) {
    let success = false;
    try {
        const response = await httpClient.post('auth/login', {
            phone: phone,
            password: password,
        });

        const token = response.data.token;

        success = await addUserToStore(token, remember);
        return {
            success: success,
        }
    } catch (error) {
        return {
            success: success,
            message: "Неверные данные для входа",
        }
    }
}

export async function register (firstName, lastName, phone, password) {
    let success = false;
    try {
        const response = await httpClient.post('user/registration', {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            password: password,
        });
        success = await addUserToStore(response.data.token);
        return {
            success: success,
        };
    } catch (error) {
        return {
            success: false,
            message: "Пользователь с таким телефоном уже зарегистрирован",
        };
    }
}

export async function sendSms(phone) {
    try {
        await httpClient.post('user/forgot-start', {
            phone: phone,
        });
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            message: "Такой телефон не зарегистрирован",
        };
    }
}

export async function resetPassword(phone, code, password) {
    let success = false;
    try {
        const response = await httpClient.post('user/forgot-end', {
            phone: phone,
            code: code,
            password: password,
        });
        success = await addUserToStore(response.data.token);
        return {
            success: success,
        };
    } catch (error) {
        return {
            success: false,
            message: "Неверный код из СМС",
        };
    }
}

export function logout () {
    store.commit('setUser', { username: null })
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
}