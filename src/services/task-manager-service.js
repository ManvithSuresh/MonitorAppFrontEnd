import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/system/';

export const getCPUInfo = ()=> {
    return axios.get(BASE_REST_API_URL+'cpu')

};

export const getMemoryInfo = ()=> {
    return axios.get(BASE_REST_API_URL+'ram')
};

export const getdiskInfo = ()=> {
    return axios.get(BASE_REST_API_URL+'disk')
}


    export const databaseStatusInfo = () =>{
        return axios.get(BASE_REST_API_URL + 'api/database')
    }