import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getMonitorDatabaseRequest = ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitorDatabase-requests')
}

export const addMonitorDatabaseRequest = (request) => {
    return axios.post(BASE_REST_API_URL+'add-monitorDatabase-request', request);
}

export const deleteMonitorDatabaseRequest = (mrId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitorDatabase-request/' + mrId);
}

export const updateMonitorDatabaseRequest=(mrId, request)=>{
    return axios.put(BASE_REST_API_URL + 'update-monitorDatabase-request', request)
}

export const getMonitorRequestDatabaseById=(mrId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitorDatabase-request/'+mrId)
}