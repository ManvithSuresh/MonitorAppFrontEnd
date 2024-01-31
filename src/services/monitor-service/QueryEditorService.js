import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const showDatabase = ()=> {
    return axios.get(BASE_REST_API_URL+'databases')
}


export const saveDetails = (request) => {
    const formData = new FormData();
    
    // Append JSON data as a separate field
    formData.append('jsonData', JSON.stringify({
        queryName: request.queryName,
        selectedDatabase: request.selectedDatabase,
        selectedTable: request.selectedTable,
        query: request.query,
    }));

    // Append other form fields or files as needed
    // formData.append('file', file);

    return axios.post(BASE_REST_API_URL + 'saveQueryEditorDetails', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};





// export const executeQuery= ()=>{
//     return axios.add(BASE_REST_API_URL+"/execute-query/{databaseID}");
// }