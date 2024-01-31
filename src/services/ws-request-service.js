import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const listWSRequests = () => {
    return axios.get(BASE_REST_API_URL + 'get-web-services')
};

export const createWSRequest = (wsr) => {
    return axios.post(BASE_REST_API_URL + 'add-web-service', wsr)
}

export const getWSRequestById = (wsrId) => {
    return axios.get(BASE_REST_API_URL + 'get-web-service/' + wsrId);
}

export const updateWSRequest = (wsrId, wsr) => {
    wsr.parameters = removeBlankParameters(wsr.parameters)
    wsr.headers = removeBlankHeaders(wsr.headers)
    wsr.responseData = removeBlankResponseData(wsr.responseData)
    wsr.requestData = removeBlankRequestData(wsr.requestData)

    return axios.put(BASE_REST_API_URL + 'update-web-service', wsr);
}

export const deleteWSRequest = (wsrId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-web-service/' + wsrId);
}

export const executeWebService = (request) => {
    return axios.post(BASE_REST_API_URL + 'execute-web-service' , request);
}


export const getWebService = () => {
  return axios.get(BASE_REST_API_URL + 'get-web-services' );
}

const removeBlankParameters = (parameters) => {
    let params = []
    for(let i = 0 ; i < parameters.length; i++){
      if(( parameters[i].key !== "" && parameters[i].key !== null ) || ( parameters[i].value !== "" && parameters[i].value !== null ) ){
        params = params.concat(parameters[i])
      }
    }
    return params;
  }

  const removeBlankHeaders = (headers) => {
    let hdrs = []
    for(let i = 0 ; i < headers.length; i++){
      if((headers[i].key !== "" && headers[i].key !== null)|| (headers[i].value !== "" && headers[i].value !== null)){
        hdrs = hdrs.concat(headers[i])
      }
    }
    return hdrs;
  }

  const removeBlankRequestData = (requestData) => {
    let reqData = []
    for(let i = 0 ; i < requestData.length; i++){
      if((requestData[i].name !== "" && requestData[i].name !== null)|| (requestData[i].value !== "" && requestData[i].value !== null)){
        reqData = reqData.concat(requestData[i])
      }
    }
    return reqData;
  }

  const removeBlankResponseData = (responseData) => {
    let resData = []
    for(let i = 0 ; i < responseData.length; i++){
      if((responseData[i].name !== "" && responseData[i].name !== null)|| (responseData[i].value !== "" && responseData[i].value !== null)){
        resData = resData.concat(responseData[i])
      }
    }
    return resData;
  }