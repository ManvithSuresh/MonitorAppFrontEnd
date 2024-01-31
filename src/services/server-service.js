import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getServers = ()=> {
    return axios.get(BASE_REST_API_URL+'get-servers')
}


export const addServers = (server) => {
    return axios.post(BASE_REST_API_URL+'add-server', server);
}

export const deleteServers = (sId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-server' + sId);
}

export const updateServers=(sId, server)=>{
    return axios.put(BASE_REST_API_URL + 'update-server', server)
}

export const getServerById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-server/'+sId)
}

export const getServerStatusById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-server-status/'+sId)
}

export const getServerHourlyStatusById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-server-hourly-status/'+sId)
}



//services
export const getServices = ()=> {
    return axios.get(BASE_REST_API_URL+'get-server-group')
}


export const addServices = (server) => {
    return axios.post(BASE_REST_API_URL+'add-server-group', server);
}

export const deleteServices= (sId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-server-group' + sId);
}

export const updateServices=(sId, server)=>{
    return axios.put(BASE_REST_API_URL + 'update-server-group', server)
}

export const getServicesById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-server-group-by/'+sId)
}

//ports

export const getAllPorts = ()=> {
    return axios.get(BASE_REST_API_URL+'get-all-ports')
}