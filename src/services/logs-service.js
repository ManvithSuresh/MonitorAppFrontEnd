import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';


export const get_info_logs= ()=> {
    return axios.get(BASE_REST_API_URL+'logs/info')
}
export const get_error_logs= ()=> {
    return axios.get(BASE_REST_API_URL+'logs/error')
}

export const get_warn_logs= ()=> {
    return axios.get(BASE_REST_API_URL+'logs/warn')
}

export const get_debug_logs= ()=> {
    return axios.get(BASE_REST_API_URL+'logs/debug')
}


export const getLogsByDateTimeAndLevel = (level, startTime, endTime) => {
    const params = {
        level: level,
        startTime: startTime,
        endTime: endTime
    };

    return axios.get(BASE_REST_API_URL + 'logs/byDateTimeAndLevel', { params: params });
};
