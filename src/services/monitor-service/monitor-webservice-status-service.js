import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:9090/api/';


export const getMonitorWebServiceStatus= ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitorWebService-status')
}


export const addMonitorWebServiceStatus = (monitorStat) => {
    return axios.post(BASE_REST_API_URL+'add-monitorWebService-status'+monitorStat);
}

export const deleteMonitorWebServiceStatus = (statId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitorWebService-status/' + statId);
}

export const updateMonitorWebServiceStatus=(statId)=>{
    return axios.update(BASE_REST_API_URL + 'update-monitorWebService-status'+statId)
}


export const getMonitorWebServiceStatusById=(statId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitorWebService-status/'+statId)
}

export const getMonitorWebserviceHourlyStatusById=(statId)=>{
    return axios.get(BASE_REST_API_URL+'/get-webservice-hourly-status/{id}'+statId)
}