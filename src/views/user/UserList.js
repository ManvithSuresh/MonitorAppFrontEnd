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
  CTooltip
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { cilUserPlus } from "@coreui/icons";

import { listUsers } from "../../services/user-service";

import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import User from "./User";
import Pagination from "../pagination/Pagination";

function UserList() {

  const [users, setUsers] = React.useState([]);

  const navigate = useNavigate();

  const [noOfRows, setNoOfRows] = React.useState(4);

  React.useEffect(() => {
    getUsers();
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

  const getUsers = () => {
    listUsers()
      .then((response) => {
        console.log(response);
        let users = response.data;
        users = users.filter((user) =>  user.id > 1 );
        setUsers(users);
        if(users && users>0){
        showSuccessTost("Successfully fetched all Users..")
        }
        else{
          console.log("No data found ")
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorTost(error.message)
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
                <h4>User List</h4>
              </CCol>
              <CCol xs={1}>
                <CRow>
                  <CTooltip content="Add User" placement="bottom">
                    <NavLink to="/user-detail">
                      <CButton color="primary" shape="rounded-pill">
                        <CIcon icon={cilUserPlus} />
                      </CButton>
                    </NavLink>
                  </CTooltip>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all  Registered users
            </p>
            {users && users.length > 0 ?                
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">E-Mail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              {users.map(
                  (item, index) => {
                    let userList;

                    if(index >= ( (selectedPage - 1) * noOfRows ) && index < ( selectedPage * noOfRows ) )
                    {
                      userList = <User key={item.id} item={item} index={index} /> 
                    }

                    return userList;
                  }
                ) 
              }                
              </CTableBody>
            </CTable> :  <div>No Users Added Yet...</div> }
            <Pagination selectedPage={selectedPage} setSelectedPage={setSelectedPage} objects={users} noOfRows={noOfRows} setNoOfRows={setNoOfRows}/>                  
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer />
    </CRow>
  );
}

export default UserList;
