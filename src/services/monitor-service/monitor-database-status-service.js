import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:9090/api/';


export const getMonitorDatabaseStatus= ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitorDatabase-statuses')
}


export const addMonitorDatabaseStatus = (monitorStat) => {
    return axios.post(BASE_REST_API_URL+'add-monitordatabase-status'+monitorStat);
}

export const deleteMonitorDatabaseStatus = (statId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitordatabase-status' + statId);
}

export const updateMonitorDatabaseStatus=(statId)=>{
    return axios.update(BASE_REST_API_URL + 'update-monitordatabase-status'+statId)
}


export const getMonitorDatabaseStatusById=(statId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitor-status/'+statId)
}