


import React ,
{useEffect, useState } from "react";
import {
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CInputGroup,
  CFormSelect,
  CButton,
} from "@coreui/react";
import { useParams } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import ServerMonitorDetails from "./ServerRequest";
import DatabaseMonitorDetails from "./DatabaseRequest";
import WebServiceMonitorDetails from "./WebserviceRequest";
import ServerGroupMonitorDetails from "./List/ServerGroup";


const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const requestId = params.requestId;
  console.log(requestId);

  


}
function MonitorRequestDetails() {
  return (
    <CRow>
      <CCol xs={12}>
        {/* <CCard className="mb-4"> */}
          <CCardHeader>
            <h4>Monitor Request Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the monitor requests
            </p>
            <Details />
         
            <CCol md={12} className="mt-3">
        <CRow>
          {/* Server Monitor Request Section */}

        
          <CCol md={12}>
            <ServerMonitorDetails />
          </CCol>
{/*           
          <CCol md={12}>
            <ServerGroupMonitorDetails  />
          </CCol> */}

          <CCol md={12}>
            <WebServiceMonitorDetails  />
          </CCol>

         

          {/* Database Monitor Request Section */}
          <CCol md={12}>
            <DatabaseMonitorDetails />
          </CCol>
          
        </CRow>
      </CCol>
</CCardBody>
        {/* </CCard> */}
      </CCol>
    </CRow>
  );
};

export default MonitorRequestDetails;



