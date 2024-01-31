import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';


export const getAllUserLogs = () => {
    return axios.get(BASE_REST_API_URL + 'get-all-user-logs')
};