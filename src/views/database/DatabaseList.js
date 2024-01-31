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
import { cilCode } from "@coreui/icons";
import { getDatabaseRequest } from "../../services/database-service"
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Database from "./Database";
import Pagination from "../pagination/Pagination";


function DatabaseList() {
  const [databases, setDatabases] = useState([]);
  const navigate = useNavigate();
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);


  useEffect(() => {
    fetchDatabases();
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

  const fetchDatabases = () => {
    getDatabaseRequest()
      .then((response) => {
        console.log(response);
        const databases = response.data;
        setDatabases(databases);
        if(databases && databases.length>0){
          showSuccessToast("Successfully fetched all Databases");
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error(error);
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
                <h4>Database List</h4>
              </CCol>
              <CCol xs={1}>
                <CRow>
                  <CTooltip content="Add Database" placement="bottom">
                    <NavLink to="/database-detail">
                      <CButton color="primary" shape="rounded-pill">
                        <CIcon icon={cilCode} />
                      </CButton>
                    </NavLink>
                  </CTooltip>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all Databases
            </p>
            {databases && databases.length === 0 ? (
              <div>No Databases...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Host&Port</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                   
                    {/* <CTableHeaderCell scope="col">Instance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">url</CTableHeaderCell> */}
                   
                   
                   
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {databases.map((item, index) => {
                    let databaseList;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      databaseList = 
                        <Database key={item.id} item={item} />
                     
                    }

                    return databaseList;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={databases}
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

export default DatabaseList;
