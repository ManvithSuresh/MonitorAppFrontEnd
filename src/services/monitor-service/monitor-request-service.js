import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getMonitorRequest = ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitor-requests')
}

export const addMonitorRequest = (request) => {
    return axios.post(BASE_REST_API_URL+'add-monitor-request', request);
}

export const deleteMonitorRequest = (mrId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitor-request/' + mrId);
}

export const updateMonitorRequest=(mrId, request)=>{
    return axios.put(BASE_REST_API_URL + 'update-monitor-request', request)
}

export const getMonitorRequestById=(mrId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitor-request/'+mrId)
}