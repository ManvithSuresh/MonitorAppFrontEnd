    import axios from 'axios'

    const BASE_REST_API_URL = 'http://localhost:9090/api/';

    export const getDatabaseRequest = () => {
        return axios.get(BASE_REST_API_URL + 'get-databases')
    }

    export const addDatabaseRequest = (request) => {
        return axios.post(BASE_REST_API_URL+'add-database', request);
    }

    export const deleteDatabaseRequest = (dbId) => {
        return axios.delete(BASE_REST_API_URL + 'delete-databases/' + dbId);
    }

    export const updateDatabaseRequest=(dbId, request)=>{
        return axios.put(BASE_REST_API_URL + 'updateDatabase', request)
    }

    export const getDatabaseRequestById=(dbId)=>{
        return axios.get(BASE_REST_API_URL+'get-database/'+dbId)
    }


    //databaseStatusService

    export const getDatabaseStatusRequest = ()=> {
        return axios.get(BASE_REST_API_URL+'getDatabaseStatuses')
    }


//status
    export const getDatabaseStatusById=(dsId)=>{
        return axios.get(BASE_REST_API_URL + 'get-database-status'+dsId)
    }
    
    export const getDatabaseHourlyStatusById=(dsId)=>{
        return axios.get(BASE_REST_API_URL + 'get-database-hourly-status/'+dsId)
    }