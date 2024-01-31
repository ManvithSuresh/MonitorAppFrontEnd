import React from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
} from "@coreui/react";

import {
  listWSRequests,
  executeWebService,
} from "../../../services/ws-request-service";

import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";

import ExecuteWSResponseData from "./ExecuteWSResponseData";

import xmlFormatter from "xml-formatter";
import ExecuteWSRequestData from "./ExecuteWSRequestData";

const Details = () => {
  const [webServices, setWebServices] = useState([]);
  const [name, setName] = useState("");

  const [responseCode, setResponseCode] = useState(0);
  const [responseString, setResponseString] = useState("");
  const [responseData, setResponseData] = useState([]);

  const [time, setTime] = useState(0);

  const [activeKey, setActiveKey] = useState(1);
  const [tabClick, setTabClick] = useState(false);

  const [requestData, setRequestData] = useState([]);

  const getUUID = () => {
    const unique_id = uuid();
    return unique_id.slice(0, 8);
  };

  useEffect(() => {
    getAllWSRequests();
  }, []);

  useEffect(() => {
    parseRequestData(name);
  }, [name]);

  const getAllWSRequests = () => {
    listWSRequests()
      .then((response) => {
        console.log(response);
        const wServices = response.data;
        setWebServices(wServices);
        setName(wServices && wServices.length > 0 ? wServices[0].name : "");
        if (wServices.length >= 1) {
          parseRequestData(wServices[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const parseRequestData = (name) => {
    let webServiceRequest;

    for (let i = 0; i < webServices.length; i++) {
      if (webServices[i].name === name) {
        webServiceRequest = webServices[i];
        break;
      }
    }

    if (!webServiceRequest) {
      return;
    }

    let reqData = [];

    reqData = [...webServiceRequest.requestData];

    reqData = findPatter(
      webServiceRequest.url ? webServiceRequest.url : "",
      reqData
    );

    if (webServiceRequest.parameters) {
      webServiceRequest.parameters.map((p) => {
        reqData = findPatter(p.value, reqData);
      });
    }

    if (webServiceRequest.headers) {
      webServiceRequest.headers.map((h) => {
        reqData = findPatter(h.value, reqData);
      });
    }

    reqData = findPatter(
      webServiceRequest.requestBody ? webServiceRequest.requestBody : "",
      reqData
    );

    setRequestData(reqData);
    console.log(requestData);
  };

  const findPatter = (text, reqData) => {
    const pattern = /\${[^}]*}/g;

    const matches = text.match(pattern);

    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        const index = reqData.findIndex((rd) => rd.name === matches[i]);
        if (index === -1) {
          reqData = reqData.concat({
            uuid: getUUID(),
            name: matches[i],
            description: "",
            isNewlyAdded: false,
            type: "String",
            value: "",
          });
        }
      }
    }
    return reqData;
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (tabClick) {
      return;
    }

    let wService;
    for (let i = 0; i < webServices.length; i++) {
      if (webServices[i].name === name) {
        wService = webServices[i];
        break;
      }
    }

    setValidated(true);

    const wsName = name;
    const startTime = new Date();
    executeWebService({ wsName, requestData })
      .then((response) => {
        const endTime = new Date();
        setTime(endTime - startTime);
        console.log(response.data);
        setResponseCode(
          response.data.responseCode ? response.data.responseCode : 0
        );
        setResponseData(
          response.data.responseData ? response.data.responseData : []
        );
        if (
          wService.accept === "application/xml" ||
          wService.accept === "text/xml" ||
          wService.accept === "application/html" ||
          wService.accept === "text/html" ||
          wService.accept === "application/rss+xml" ||
          wService.accept === "application/xhtml+xml"
        ) {
          if (response.data.responseString) {
            // Use xml-formatter to pretty print the XML string
            const formattedXml = xmlFormatter(response.data.responseString, {
              indentation: "  ", // You can adjust the indentation as needed
            });
            setResponseString(formattedXml);
          } else {
            setResponseString("");
          }
        } else {
          if (response.data.responseString) {
            const jsonData = JSON.parse(response.data.responseString);
            // Pretty print the JSON with 2-space indentation
            const prettyJSON = JSON.stringify(jsonData, null, 2);
            setResponseString(prettyJSON);
          } else {
            setResponseString("");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRequestData = () => {
    const rData = requestData.concat({
      uuid: getUUID(),
      name: "",
      isNewlyAdded: true,
      description: "",
      value: "",
    });
    setRequestData(rData);
  };

  const removeRequestData = (id) => {
    setRequestData((oldv) => {
      return oldv.filter((p) => (p.id ? p.id !== id : p.uuid !== id));
    });
  };

  const setRequestDataParent = (id, name, value, description) => {
    const rData = [...requestData];
    for (let i = 0; i < rData.length; i++) {
      if (rData[i].uuid === id || rData[i].id === id) {
        rData[i].name = name;
        rData[i].value = value;
        rData[i].description = description;
        break;
      }
    }
    setRequestData(rData);
  };

  const addResponseData = () => {
    const rData = responseData.concat({
      uuid: getUUID(),
      name: "",
      description: "",
      values: [],
    });
    setResponseData(rData);
  };

  const removeResponseData = (id) => {
    setResponseData((oldv) => {
      return oldv.filter((p) => (p.id ? p.id !== id : p.uuid !== id));
    });
  };

  const setResponseDataParent = (id, name, values) => {
    const rData = [...responseData];
    for (let i = 0; i < rData.length; i++) {
      if (rData[i].uuid === id || rData[i].id === id) {
        rData[i].name = name;
        rData[i].values = values;
        break;
      }
    }
    setResponseData(rData);
  };

  const statusStyle = {
    color: responseCode > 300 ? "#ef376e" : "",
  };

  return (
    <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {webServices && webServices.length == 0 ? (
          <div>No Web Services to Execute...</div>
        ) : (
          <>
            <CCol md={3}>
              <CFormLabel htmlFor="validationCustom05">
                Web Service Name
              </CFormLabel>
            </CCol>
            <CCol md={9}>
              <CFormSelect
                id="validationCustom05"
                value={name}
                onChange={(e) => {
                  setValidated(false);
                  setName(e.target.value);
                  parseRequestData(e.target.value);
                }}
              >
                {webServices.map((ws) => (
                  <option key={ws.id}>{ws.name}</option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>
                Please provide a valid Web Service.
              </CFormFeedback>
            </CCol>
            <CRow className="p-1">
              {requestData.map((reqData, index) => {
                let rData;
                rData = (
                  <ExecuteWSRequestData
                    key={reqData.id ? reqData.id : reqData.uuid}
                    id={reqData.id ? reqData.id : reqData.uuid}
                    requestData={reqData}
                    isLastIndex={requestData.length - 1 === index}
                    addRequestData={addRequestData}
                    setRequestDataParent={setRequestDataParent}
                    removeRequestData={removeRequestData}
                  />
                );
                return rData;
              })}
            </CRow>
            <CCol xs={12}>
              <CRow>
                <CCol xs={4}></CCol>
                <CCol xs={4}></CCol>
                <CCol xs={4}>
                  <CRow className="align-items-end">
                    <CCol xs={4}></CCol>
                    <CCol xs={3}>
                      <CRow>
                        {/* <CButton color="primary" type="submit" className="ms-2">
                    Send
                  </CButton> */}
                      </CRow>
                    </CCol>
                    <CCol xs={1}></CCol>
                    <CCol xs={3}>
                      <CRow>
                        <CButton color="primary" type="submit" className="ms-2">
                          Send
                        </CButton>
                      </CRow>
                    </CCol>
                    <CCol xs={1}></CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </>
        )}
      </CForm>
      {responseCode != 0 ? (
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CRow className="p-1">
            <CCol xs={6}>
              <h6>Web Service Response</h6>
            </CCol>
            <CCol xs={2}>
              <h6 style={statusStyle}>Status : {responseCode}</h6>
            </CCol>
            <CCol xs={2}>
              <h6 style={statusStyle}>Time : {time}ms</h6>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12}>
              <CNav variant="tabs" role="tablist">
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
                    Body
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
                    Data
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
                    <CFormTextarea
                      id="exampleFormControlTextarea1"
                      label="Response Body"
                      value={responseString}
                      disabled
                      rows={5}
                    ></CFormTextarea>
                  </CRow>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="headers-tab-pane"
                  visible={activeKey === 2}
                >
                  <CRow className="p-1">
                    {responseData.map((resData, index) => {
                      let rData;
                      rData = (
                        <ExecuteWSResponseData
                          key={resData.id ? resData.id : resData.uuid}
                          id={resData.id ? resData.id : resData.uuid}
                          responseData={resData}
                          isLastIndex={responseData.length - 1 === index}
                          addResponseData={addResponseData}
                          setResponseDataParent={setResponseDataParent}
                          removeResponseData={removeResponseData}
                        />
                      );
                      return rData;
                    })}
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CForm>
      ) : (
        <></>
      )}
    </>
  );
};

function WebServiceExecute() {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Web Service Execute</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Dynamic execution of web service
            </p>
            {Details()}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default WebServiceExecute;
