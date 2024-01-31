import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getMonitorWebserviceRequest = ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitorwebservice-requests')
}

export const addMonitorWebserviceRequest = (request) => {
    return axios.post(BASE_REST_API_URL+'add-monitorwebservice-request', request);
}

export const deleteMonitorWebserviceRequest = (mrId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitorwebservice-request/' + mrId);
}

export const updateMonitorWebserviceRequest=(mrId, request)=>{
    return axios.put(BASE_REST_API_URL + 'update-monitorwebservice-request', request)
}

export const getMonitorRequestWebserviceById=(mrId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitorwebservice-request/'+mrId)
}