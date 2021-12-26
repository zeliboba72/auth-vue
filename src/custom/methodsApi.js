import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://backend-front-test.dev.echo-company.ru/api/',
});

export function getUser(justCheck) {
    const token = localStorage.getItem('token');
    if (!token) {
        return new Promise((resolve) => {
            return resolve(false);
        });
    }
    return axiosInstance.get('user', {
        headers: {
            'Authorization': token,
        }
    }).then((response) => {
        if (justCheck) {
            return true;
        } else {
            return response.data;
        }
    }).catch(() => {
        return false;
    });
}

export function login (phone, password, remember) {
    return axiosInstance.post('auth/login', {
        phone: phone,
        password: password,
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        if (!remember) {
            window.addEventListener('unload', () => {
                localStorage.removeItem('token');
            })
        }
        return {
            success: true,
        };
    }).catch(() => {
        return {
            success: false,
            message: "Неверные данные для входа",
        };
    });
}

export function registration (firstName, lastName, phone, password) {
    return axiosInstance.post('user/registration', {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password: password,
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        return true;
    }).catch(() => {
        return false;
    });
}

export function sendSms(phone) {
    return axiosInstance.post('user/forgot-start', {
        phone: phone,
    }).then(() => {
        return {
            success: true,
        };
    }).catch(() => {
        return {
            success: false,
            message: "Такой телефон не зарегистрирован",
        };
    });
}

export function resetPassword(phone, code, password) {
    return axiosInstance.post('user/forgot-end', {
        phone: phone,
        code: code,
        password: password,
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        return {
            success: true,
        };
    }).catch(() => {
        return {
            success: false,
            message: "Неверный код из СМС",
        };
    });
}

export function logout () {
    localStorage.removeItem('token');
}