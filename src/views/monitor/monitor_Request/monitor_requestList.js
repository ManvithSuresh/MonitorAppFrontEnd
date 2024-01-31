import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CFormSelect,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMonitor } from "@coreui/icons";
import { getMonitorRequest } from "../../../services/monitor-service/monitor-request-service";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MonitorRequest from "./monitor_request";
import Pagination from "../../pagination/Pagination";

function MonitorRequestList() {
  const [monitorRequests, setMonitorRequests] = useState([]);
  const navigate = useNavigate();
  const [noOfRows, setNoOfRows] = useState(4);

  useEffect(() => {
    fetchMonitorRequests();
  }, []);

  const showSuccessToast = (message) => {
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

  const showErrorToast = (message) => {
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

  const fetchMonitorRequests = () => {
    getMonitorRequest()
      .then((response) => {
        console.log(response);
        const monitorRequests = response.data;
        setMonitorRequests(monitorRequests);
        if(monitorRequests && monitorRequests>0){
        showSuccessToast("Successfully fetched all Monitor Requests..");
        }
        else{
          console.log("No data found")
        }
      })
      .catch((error) => {
        console.error(error);
        showErrorToast(error.message);
      });
  };

  const [selectedPage, setSelectedPage] = useState(1);

  let pagination;
  let noPages = Math.trunc(monitorRequests.length / noOfRows);
  if (monitorRequests.length > noOfRows && noPages >= 1) {
    let preDisabled = selectedPage === 1;
    let nxtDisabled = selectedPage === noPages;
    let prev = (
      <CPaginationItem
        disabled={preDisabled}
        onClick={() => setSelectedPage(selectedPage - 1)}
      >
        Previous
      </CPaginationItem>
    );
    let item = [];
    for (let i = 1; i <= noPages; i++) {
      if (i === selectedPage) {
        item.push(
          <CPaginationItem active onClick={() => setSelectedPage(i)} key={i}>
            {i}
          </CPaginationItem>
        );
      } else {
        item.push(
          <CPaginationItem onClick={() => setSelectedPage(i)} key={i}>
            {i}
          </CPaginationItem>
        );
      }
    }
    let next = (
      <CPaginationItem
        disabled={nxtDisabled}
        onClick={() => setSelectedPage(selectedPage + 1)}
      >
        Next
      </CPaginationItem>
    );
    pagination = (
      <CPagination aria-label="Page navigation example">
        {prev}
        {item}
        {next}
      </CPagination>
    );
  } else {
    pagination = <></>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={11}>
                <h4>Monitor Request List</h4>
              </CCol>
              <CCol xs={1}>
                <CRow>
                  <CTooltip content="Add Monitor Request" placement="bottom">
                    <NavLink to="/monitor-request-detail">
                      <CButton color="primary" shape="rounded-pill">
                        <CIcon icon={cilMonitor} />
                      </CButton>
                    </NavLink>
                  </CTooltip>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all Monitor Requests
            </p>
            {monitorRequests && monitorRequests.length === 0 ? (
              <div>No Monitoring Requests...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Request Name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Server</CTableHeaderCell>
                    
                    <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {monitorRequests.map((item, index) => {
                    let monitorRequestList;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      monitorRequestList = (
                        <MonitorRequest key={item.id} item={item} />
                      );
                    }

                    return monitorRequestList;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={monitorRequests}
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

export default MonitorRequestList;
