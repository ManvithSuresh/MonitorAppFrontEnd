import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getMonitorServerGroupRequest = ()=> {
    return axios.get(BASE_REST_API_URL+'get-all-monitor-server-group')
}

export const addMonitorServerGroupRequest = (request) => {
    return axios.post(BASE_REST_API_URL+'add-monitor-server-group', request);
}

export const deleteMonitorServerGroupRequest = (mrId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-monitor-server-group/' + mrId);
}

export const updateMonitorServerGroupRequest=(mrId, request)=>{
    return axios.put(BASE_REST_API_URL + 'update-monitor-server-group', request)
}

export const getMonitorServerGroupRequestById=(mrId)=>{
    return axios.get(BASE_REST_API_URL+'get-monitor-server-group-by/'+mrId)
}