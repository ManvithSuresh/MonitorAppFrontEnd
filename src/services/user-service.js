import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const loginUser = (login) => {
    return axios.post(BASE_REST_API_URL + 'login', login, { withCredentials : true });
}

export const listUsers = () => {
    return axios.get(BASE_REST_API_URL + 'get-users')
};

export const createUser = (user) => {
    return axios.post(BASE_REST_API_URL + 'add-user', user)
}

export const getUserById = (uId) => {
    return axios.get(BASE_REST_API_URL + 'get-user/' + uId);
}

export const updateUser = (uId, user) => {
    return axios.put(BASE_REST_API_URL + 'update-user', user);
}

export const deleteUser = (uId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-user/' + uId);
}

