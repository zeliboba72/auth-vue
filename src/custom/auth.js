import axios from "axios";

export default function isAuthorized() {
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