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
import { cilStorage } from "@coreui/icons";
import { getServers , getServices } from "../../services/server-service";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Server_Group from "../server-group/Server_Group";
import Pagination from "../pagination/Pagination";

function ServerGroupList() {

  const [server , setServer] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    fetchServices();
  }, []);


 
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
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
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  const fetchServices = () => {
    getServices()
      .then((response) => {
        console.log(response);
        const services = response.data;
        setServices(services);

        if(services && services.length>0){
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
                <h4>Server Group List</h4>
              </CCol>
             
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">List of all server groups</p>
            {services && services.length === 0 ? (
              <div>No ServerGroups Added Yet...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Group Name</CTableHeaderCell>
                  
                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>

                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {services.map((item, index) => {
                    let servergroupList;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      servergroupList = <Server_Group key={item.id} item={item} />;
                    }

                    return servergroupList;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={services }
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

export default ServerGroupList;
