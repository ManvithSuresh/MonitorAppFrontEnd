import React from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { cilPlus } from "@coreui/icons";

import { listWSRequests } from "../../services/ws-request-service";

import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import WebService from "./WebService";
import Pagination from "../pagination/Pagination";

function WebServiceList() {
  const [webServiceRequests, setWebServiceRequests] = React.useState([]);

  const navigate = useNavigate();

  const [noOfRows, setNoOfRows] = React.useState(4);

  React.useEffect(() => {
    getWebServiceRequests();
  }, []);

  const showSuccessTost = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const showErrorTost = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const getWebServiceRequests = () => {
    listWSRequests()
      .then((response) => {
        console.log(response);
        const webServiceRequests = response.data;
        setWebServiceRequests(webServiceRequests);
        if(webServiceRequests && webServiceRequests.length>0){
          showSuccessTost("Successfully fetched all Web Services..");
        } else {
          console.log("No data found");
        }
       
      })
      .catch((error) => {
        console.log(error);
        showErrorTost(error.message);
      });
  };

  const [selectedPage, setSelectedPage] = React.useState(1);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={11}>
                <h4>Web Service  List</h4>
              </CCol>
              <CCol xs={1}>
                <CRow>
                  <CTooltip content="Add Web Service" placement="bottom">
                    <NavLink to="/ws-request-detail">
                      <CButton color="primary" shape="rounded-pill">
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </NavLink>
                  </CTooltip>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all web services available.
            </p>
            {webServiceRequests && webServiceRequests.length == 0 ? (
              <div>No Web Service Requests...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Http Method</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {webServiceRequests.map((item, index) => {
                    let webServiceList;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      webServiceList = (
                        <WebService key={item.id} item={item} index={index} />
                      );
                    }

                    return webServiceList;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={webServiceRequests}
              noOfRows={noOfRows}
              setNoOfRows={setNoOfRows}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer />
    </CRow>
  );
}

export default WebServiceList;
