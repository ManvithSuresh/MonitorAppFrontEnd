import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";

import { useParams } from "react-router-dom";

import {
  getWSRequestById,
  createWSRequest,
  updateWSRequest,
} from "../../services/ws-request-service";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Parameter from "./Parameter";

import { v4 as uuid } from "uuid";
import Header from "./Header";
import WSRequestData from "./WSRequestData";
import WSResponseData from "./WSResponseData";

const Details = () => {
  const navigate = useNavigate();

  const params = useParams();

  const wsrId = params.wsrId;

  const [webServiceRequest, setWebServiceRequest] = useState({});

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [contentType, setContentType] = useState("");
  const [accept, setAccept] = useState("");
  const [timeout, setTimeout] = useState(10);
  const [parameters, setParameters] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [
    disableCertificateAuthentication,
    setDisableCertificateAuthentication,
  ] = useState(false);

  const [activeKey, setActiveKey] = useState(1);
  const [tabClick, setTabClick] = useState(false);

  const getUUID = () => {
    const unique_id = uuid();
    return unique_id.slice(0, 8);
  };

  useEffect(() => {
    getWebServiceRequest();
  }, []);

  const getWebServiceRequest = () => {
    if (wsrId) {
      getWSRequestById(wsrId)
        .then((response) => {
          console.log(response);
          const webServiceRequest = response.data;

          setWebServiceRequest(webServiceRequest);
          setName(webServiceRequest.name);
          setHttpMethod(webServiceRequest.httpMethod);
          setUrl(webServiceRequest.url);

          setRequestBody(webServiceRequest.requestBody);
          setContentType(webServiceRequest.contentType);
          setAccept(webServiceRequest.accept);
          setTimeout(webServiceRequest.timeout);

          if (webServiceRequest.parameters.length == 0) {
            webServiceRequest.parameters.push({
              uuid: getUUID(),
              key: "",
              value: "",
            });
          }

          setParameters(webServiceRequest.parameters);

          if (webServiceRequest.headers.length == 0) {
            webServiceRequest.headers.push({
              uuid: getUUID(),
              key: "",
              value: "",
            });
          }

          setHeaders(webServiceRequest.headers);

          // if (webServiceRequest.requestData.length == 0) {
          //   webServiceRequest.requestData.push({
          //     uuid: getUUID(),
          //     name: "",
          //     isNewlyAdded : true,
          //     description : "",
          //     value: "",
          //   });
          // }

          setRequestData(webServiceRequest.requestData);

          if (webServiceRequest.responseData.length == 0) {
            webServiceRequest.responseData.push({
              uuid: getUUID(),
              name: "",
              isNewlyAdded: true,
              description: "",
              value: "",
            });
          }
          setResponseData(webServiceRequest.responseData);

          setIsPrivate(webServiceRequest.isPrivate);
          setDisableCertificateAuthentication(
            webServiceRequest.disableCertificateAuthentication
          );

          if (webServiceRequest.id) {
            console.log(webServiceRequest);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setHttpMethod("GET");
      addParameter();
      addHeader();
      addRequestData();
      addResponseData();
    }
  };

  const [validated, setValidated] = useState(false);
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   if (tabClick) {
  //     setTabClick(false);
  //     return;
  //   }

  //   removeBlankParameters();
  //   removeBlankHeaders();
  //   removeBlankRequestData();
  //   removeBlankResponseData();

  //   if (wsrId) {
  //     // update
  //     setValidated(true);
  //     const wsRequest = {
  //       id: wsrId,
  //       name,
  //       httpMethod,
  //       url,
  //       requestBody,
  //       contentType,
  //       accept,
  //       timeout,
  //       parameters,
  //       headers,
  //       requestData,
  //       responseData,
  //       isPrivate,
  //       disableCertificateAuthentication,
  //     };

  //     updateWSRequest(wsrId, wsRequest)
  //       .then((response) => {
  //         navigate("/ws-request-list");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     // create
  //     setValidated(true);

  //     const wsRequest = {
  //       name,
  //       httpMethod,
  //       url,
  //       requestBody,
  //       contentType,
  //       accept,
  //       timeout,
  //       parameters,
  //       headers,
  //       requestData,
  //       responseData,
  //       isPrivate,
  //       disableCertificateAuthentication,
  //     };
  //     createWSRequest(wsRequest)
  //       .then((response) => {
  //         navigate("/ws-request-list");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (tabClick) {
      setTabClick(false);
      return;
    }

    const noBlankParams = removeBlankParameters();
    const noBlankHeaders = removeBlankHeaders();
    const noBlankReqData = removeBlankRequestData();
    const noBlankResData = removeBlankResponseData();

    if (wsrId) {
      // update
      setValidated(true);
      const wsRequest = {
        id: wsrId,
        name,
        httpMethod,
        url,
        requestBody,
        contentType,
        accept,
        timeout,
        'parameters' : noBlankParams,
        'headers' : noBlankHeaders,
        'requestData' : noBlankReqData,
        'responseData' : noBlankResData,
        isPrivate,
        disableCertificateAuthentication,
      };

      updateWSRequest(wsrId, wsRequest)
        .then((response) => {
          navigate("/ws-request-list");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // create
      setValidated(true);

      const wsRequest = {
        name,
        httpMethod,
        url,
        requestBody,
        contentType,
        accept,
        timeout,
        'parameters' : noBlankParams,
        'headers' : noBlankHeaders,
        'requestData' : noBlankReqData,
        'responseData' : noBlankResData,
        isPrivate,
        disableCertificateAuthentication,
      };
      createWSRequest(wsRequest)
        .then((response) => {
          navigate("/ws-request-list");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeBlankParameters = () => {
    let params = [];
    for (let i = 0; i < parameters.length; i++) {
      if (
        (parameters[i].key !== "" && parameters[i].key !== null) ||
        (parameters[i].value !== "" && parameters[i].value !== null)
      ) {
        params = params.concat(parameters[i]);
      }
    }
    setParameters(params);
    return params;
  };

  const removeBlankHeaders = () => {
    let hdrs = [];
    for (let i = 0; i < headers.length; i++) {
      if (
        (headers[i].key !== "" && headers[i].key !== null) ||
        (headers[i].value !== "" && headers[i].value !== null)
      ) {
        hdrs = hdrs.concat(headers[i]);
      }
    }
    setHeaders(hdrs);
    return hdrs;
  };

  const removeBlankRequestData = () => {
    let reqData = [];
    for (let i = 0; i < requestData.length; i++) {
      if (
        (requestData[i].name !== "" && requestData[i].name !== null) ||
        (requestData[i].value !== "" && requestData[i].value !== null)
      ) {
        reqData = reqData.concat(requestData[i]);
      }
    }
    setRequestData(reqData);
    return reqData;
  };

  const removeBlankResponseData = () => {
    let resData = [];
    for (let i = 0; i < responseData.length; i++) {
      if (
        (responseData[i].name !== "" && responseData[i].name !== null) ||
        (responseData[i].value !== "" && responseData[i].value !== null)
      ) {
        resData = resData.concat(responseData[i]);
      }
    }
    setResponseData(resData);
    return resData;
  };

  const addParameter = () => {
    const params = parameters.concat({ uuid: getUUID(), key: "", value: "" });
    setParameters(params);
  };

  const removeParameter = (id) => {
    setParameters((oldv) => {
      return oldv.filter((p) => (p.id ? p.id !== id : p.uuid !== id));
    });
  };

  const setParameter = (id, key, value) => {
    const params = [...parameters];
    for (let i = 0; i < params.length; i++) {
      if (params[i].uuid === id || params[i].id === id) {
        params[i].key = key;
        params[i].value = value;
        break;
      }
    }
    setParameters(params);
  };

  const addHeader = () => {
    const hdrs = headers.concat({ uuid: getUUID(), key: "", value: "" });
    setHeaders(hdrs);
  };

  const removeHeader = (id) => {
    setHeaders((oldv) => {
      return oldv.filter((h) => (h.id ? h.id !== id : h.uuid !== id));
    });
  };

  const setHeader = (id, key, value) => {
    const hdrs = [...headers];
    for (let i = 0; i < hdrs.length; i++) {
      if (hdrs[i].uuid === id || hdrs[i].id === id) {
        if (key === "Content-Type") {
          setContentType(value);
        }
        if (key === "Accept") {
          setAccept(value);
        }
        hdrs[i].key = key;
        hdrs[i].value = value;
        break;
      }
    }
    setHeaders(hdrs);
  };

  const findRequestData = () => {
    findPatter(url ? url : "");

    if (parameters) {
      parameters.map((p) => {
        findPatter(p.value);
      });
    }

    if (headers) {
      headers.map((h) => {
        findPatter(h.value);
      });
    }

    findPatter(requestBody ? requestBody : "");

    console.log(requestData);
  };

  const findPatter = (text) => {
    const pattern = /\${[^}]*}/g;

    const matches = text.match(pattern);

    let reqData = [...requestData];
    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        const index = reqData.findIndex((rd) => rd.name === matches[i]);
        if (index === -1) {
          reqData = reqData.concat({
            uuid: getUUID(),
            name: matches[i],
            isNewlyAdded: false,
            type: "String",
            description: "",
            value: "",
          });
        }
      }
    }
    setRequestData(reqData);

    if (reqData.length === 0) {
      addRequestData();
    }
  };

  const addRequestData = () => {
    const reqData = requestData.concat({
      uuid: getUUID(),
      name: "",
      type: "String",
      description: "",
      isNewlyAdded: true,
      value: "",
    });
    setRequestData(reqData);
  };

  const removeRequestData = (id) => {
    setRequestData((oldv) => {
      return oldv.filter((rd) => (rd.id ? rd.id !== id : rd.uuid !== id));
    });
  };

  const setParentRequestData = (id, name, value, description) => {
    const reqData = [...requestData];
    for (let i = 0; i < reqData.length; i++) {
      if (reqData[i].uuid === id || reqData[i].id === id) {
        reqData[i].name = name;
        reqData[i].value = value;
        reqData[i].description = description;
        break;
      }
    }
    setRequestData(reqData);
  };

  const addResponseData = () => {
    const resData = responseData.concat({
      uuid: getUUID(),
      name: "",
      type: "String",
      description: "",
      value: "",
    });
    setResponseData(resData);
  };

  const removeResponseData = (id) => {
    setResponseData((oldv) => {
      return oldv.filter((rd) => (rd.id ? rd.id !== id : rd.uuid !== id));
    });
  };

  const setParentResponseData = (id, name, value) => {
    const resData = [...responseData];
    for (let i = 0; i < resData.length; i++) {
      if (resData[i].uuid === id || resData[i].id === id) {
        resData[i].name = name;
        resData[i].value = value;
        resData[i].description = description;
        break;
      }
    }
    setResponseData(resData);
  };

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom01"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom02">Http Method</CFormLabel>
        <CFormSelect
          id="validationCustom02"
          value={httpMethod}
          onChange={(e) => setHttpMethod(e.target.value)}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
          <option>HEAD</option>
          <option>OPTIONS</option>
        </CFormSelect>
        <CFormFeedback invalid>
          Please provide a valid Http Method.
        </CFormFeedback>
      </CCol>
      <CCol md={10}>
        <CFormLabel htmlFor="validationCustom03">URL</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom03"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CNav variant="tabs" role="tablist" layout="justified">
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 1}
              component="button"
              role="tab"
              aria-controls="params-tab-pane"
              aria-selected={activeKey === 1}
              onClick={() => {
                setActiveKey(1);
                setTabClick(true);
              }}
              href="#"
            >
              Params
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 2}
              component="button"
              role="tab"
              aria-controls="headers-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => {
                setActiveKey(2);
                setTabClick(true);
              }}
              href="#"
            >
              Headers
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 3}
              component="button"
              role="tab"
              aria-controls="body-tab-pane"
              aria-selected={activeKey === 3}
              onClick={() => {
                setActiveKey(3);
                setTabClick(true);
              }}
              href="#"
              to=""
            >
              Body
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 4}
              component="button"
              role="tab"
              aria-controls="request-data-tab-pane"
              aria-selected={activeKey === 4}
              onClick={() => {
                setActiveKey(4);
                setTabClick(true);
                findRequestData();
              }}
              href="#"
              to=""
            >
              Request Data
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 5}
              component="button"
              role="tab"
              aria-controls="response-data-tab-pane"
              aria-selected={activeKey === 5}
              onClick={() => {
                setActiveKey(5);
                setTabClick(true);
              }}
              href="#"
              to=""
            >
              Response Data
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="params-tab-pane"
            visible={activeKey === 1}
          >
            <CRow className="p-1">
              {parameters.map((parameter, index) => {
                let paramsData;
                paramsData = (
                  <Parameter
                    key={parameter.id ? parameter.id : parameter.uuid}
                    id={parameter.id ? parameter.id : parameter.uuid}
                    parameter={parameter}
                    isLastIndex={parameters.length - 1 === index}
                    addParameter={addParameter}
                    setParameter={setParameter}
                    removeParameter={removeParameter}
                  />
                );
                return paramsData;
              })}
            </CRow>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="headers-tab-pane"
            visible={activeKey === 2}
          >
            <CRow className="p-1">
              {headers.map((header, index) => {
                let hrdsData;
                hrdsData = (
                  <Header
                    key={header.id ? header.id : header.uuid}
                    id={header.id ? header.id : header.uuid}
                    header={header}
                    isLastIndex={headers.length - 1 === index}
                    addHeader={addHeader}
                    setHeader={setHeader}
                    removeHeader={removeHeader}
                  />
                );
                return hrdsData;
              })}
            </CRow>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="body-tab-pane"
            visible={activeKey === 3}
          >
            <CFormTextarea
              id="exampleFormControlTextarea1"
              label="Request Body"
              value={requestBody}
              onChange={(e) => {
                setRequestBody(e.target.value);
              }}
              rows={3}
            ></CFormTextarea>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="request-data-tab-pane"
            visible={activeKey === 4}
          >
            <CRow className="p-1">
              {requestData.map((data, index) => {
                let rData;
                rData = (
                  <WSRequestData
                    key={data.id ? data.id : data.uuid}
                    id={data.id ? data.id : data.uuid}
                    requestData={data}
                    isLastIndex={requestData.length - 1 === index}
                    addRequestData={addRequestData}
                    setRequestData={setParentRequestData}
                    removeRequestData={removeRequestData}
                  />
                );
                return rData;
              })}
            </CRow>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="response-data-tab-pane"
            visible={activeKey === 5}
          >
            <CRow className="p-1">
              {responseData.map((data, index) => {
                let rData;
                rData = (
                  <WSResponseData
                    key={data.id ? data.id : data.uuid}
                    id={data.id ? data.id : data.uuid}
                    responseData={data}
                    isLastIndex={responseData.length - 1 === index}
                    addResponseData={addResponseData}
                    setResponseData={setParentResponseData}
                    removeResponseData={removeResponseData}
                  />
                );
                return rData;
              })}
            </CRow>
          </CTabPane>
        </CTabContent>
      </CCol>

      <CCol xs={12}>
        <CRow>
          <CCol xs={4}></CCol>
          <CCol xs={4}></CCol>
          <CCol xs={4}>
            <CRow className="align-items-end">
              <CCol xs={4}></CCol>
              <CCol xs={3}>
                <CRow>
                  <CButton color="primary" type="submit" className="ms-2">
                    {wsrId ? "Update" : "Create"}
                  </CButton>
                </CRow>
              </CCol>
              <CCol xs={1}></CCol>
              <CCol xs={3}>
                <CRow>
                  <CButton color="secondary" type="button" className="ms-2">
                    Clear
                  </CButton>
                </CRow>
              </CCol>
              <CCol xs={1}></CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    </CForm>
  );
};

function WebServiceDetail() {
  const params = useParams();

  const wsrId = params.wsrId;

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>
              {" "}
              {wsrId ? "Update " : "Create "} Web Service Request Details
            </h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the Web Service Request
            </p>
            {Details()}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default WebServiceDetail;
