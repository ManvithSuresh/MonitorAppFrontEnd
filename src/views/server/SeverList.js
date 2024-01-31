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
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { getServers } from "../../services/server-service";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Server from "./Server";
import Pagination from "../pagination/Pagination";


function ServerList() {
  const [servers, setServers] = useState([]); 
  const navigate = useNavigate();

  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    fetchServers();
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
  const fetchServers = () => {
    getServers()
      .then((response) => {
        console.log(response);
        const servers = response.data;
        setServers(servers);
  
        if (servers && servers.length > 0) {
          showSuccessToast("Successfully fetched all Servers.");
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  };
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={11}>
                <h4>Server List</h4>
              </CCol>
              <CCol xs={1}>
                <CRow>
                  <CTooltip content="Add Server" placement="bottom">
                    <NavLink to="/server-detail">
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
            <p className="text-medium-emphasis small">List of all servers</p>
            {servers && servers.length === 0 ? (
              <div>No Servers Added Yet...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Host</CTableHeaderCell>
                 
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {servers.map((item, index) => {
                    let serverList;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      serverList = <Server key={item.id} item={item} />;
                    }

                    return serverList;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={servers}
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

export default ServerList;
