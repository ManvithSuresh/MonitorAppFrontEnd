import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getMonitorStatus= ()=> {
    return axios.get(BASE_REST_API_URL+'get-monitor-statuses')
}


export const addMonitorStatus = (monitorStat) => {
    return axios.post(BASE_REST_API_URL+'add-monitor-status'+monitorStat);
}

export const deleteMonitorStatus = (statId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitor-status' + statId);
}

export const updateMonitorStatus=(statId)=>{
    return axios.update(BASE_REST_API_URL + 'update-monitor-status'+statId)
}


export const getMonitorStatusById=(statId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitor-status/'+statId)
}