import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const addTestConnection = (test) => {
    return axios.post(BASE_REST_API_URL+'test-connection',test);
}

export const getConnectionInfo =()=>{
    return axios.get(BASE_REST_API_URL+'result');
}

export const getConnectionInfoById =(Connection)=>{
    return axios.get(BASE_REST_API_URL+'results/'+Connection);
}