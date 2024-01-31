
import React, { useEffect, useState } from "react";
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
import {
  getMonitorServerGroupRequestById,
  addMonitorServerGroupRequest,
  updateMonitorServerGroupRequest,
} from "../../../../services/monitor-service/monitor-serverGroup-request-service";
import { getServices } from "../../../../services/server-service";
import { listUsers } from "../../../../services/user-service";
import { useNavigate } from "react-router-dom";


const ServerGroupMonitorDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const requestId = params.requestId;
    console.log(requestId);

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [hostName, setHostName] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [port, setPort] = useState("");
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState({});
   const [services , setServices] = useState([]);
    const [selectedDatabase , setSelectedDatabase]=useState({});

    const isEditMode = !!requestId;
// UseEffect for loading Selected Monitoring Request for Editing
useEffect(() => {
  if (requestId) {
    getMonitorServerGroupRequestById(requestId)
      .then((response) => {
        console.log(response.data);

        setName(response.data.name);

        const services = response.data.server;
        setSelectedServer(services);

        const user = response.data.users
          ? response.data.users.length >= 1
            ? response.data.users[0]
            : {}
          : {};

        setSelectedUser(user);

        let sUsers = [];

        if(response.data.users){
          for(let i = 0; i < response.data.users.length ; i++)
          {
            let u = response.data.users[i];
            sUsers.push(u.id)
          }
        }

        setSelectedUsers(sUsers);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  }
}, []);

useEffect(() => {
  getServices()
    .then((response) => {
      console.log(response);
      const services = response.data;
      setServices(services); // Update the state here
    })
    .catch((error) => {
      console.error("Error fetching servers:", error);
    });
}, []);





// loading users
useEffect(() => {
  listUsers()
    .then((response) => {
      console.log(response);
      const users = response.data;
      setUsers(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}, []);

const handleSubmit = (event) => {
    event.preventDefault();
  

    console.log("selected servers:", selectedServer);
    console.log("selected users:", selectedUsers);
  
    let sUsers = [];
  
    for (let i = 0; i < selectedUsers.length; i++) {
      sUsers.push(users.find((u) => u.id === selectedUsers[i]));
    }
  

    const requestData = {
        name,
        server: selectedServer,
        users: requestId ? (sUsers.length > 0 ? sUsers : []) : [],
      };
  
    if (isEditMode) {
     
    if (requestId) {
        requestData.id = requestId;
      }
  
      updateMonitorServerGroupRequest(requestId, requestData)
        .then(() => {
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error updating monitor request:", error);
        });
    } else {
     
  
      addMonitorServerGroupRequest(requestData)
        .then((response) => {
          const reqData = response.data;
  
          if (sUsers.length > 0) {
            reqData.users = sUsers;
  
            updateMonitorServerGroupRequest(requestId, reqData)
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.error("Error updating monitor request:", error);
              });
          }
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error adding monitor request:", error);
        });
    }
  };
  

return (
  <CForm
    className="row g-3 needs-validation"
    noValidate
    onSubmit={handleSubmit}
  >
    <CCol md={12}>
      <CFormLabel htmlFor="name">Request Name</CFormLabel>
      <CFormInput
        type="text"
        id="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CFormFeedback valid>Looks good!</CFormFeedback>
    </CCol>

    {/* Server Details Container */}
    <CCol md={12} className="mt-3">
      <CRow>
     
<CCol md={6}>
  <CCard>
    <CCardHeader>
      <h5>ServerGroup Details</h5>
    </CCardHeader>
    <CCardBody>
      <CFormLabel htmlFor="serverSelect">Group Name</CFormLabel>
      <CInputGroup>
        <CFormSelect
          id="serverSelect"
          value={selectedServer ? selectedServer.id : ""}
          onChange={(e) =>
            setSelectedServer(
              services.find(
                (service) => service.id === parseInt(e.target.value)
              )
            )
          }
        >
          <option value="">Choose the Group</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.groupName}
            </option>
          ))}
        </CFormSelect>
      </CInputGroup>
    </CCardBody>
  </CCard>
</CCol>




        {/* User Details Container */}
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <h5>User Details</h5>
            </CCardHeader>
            <CCardBody>
              <CFormLabel htmlFor="userSelect">Users</CFormLabel>
              <CInputGroup>
                <CFormSelect
                  id="userSelect"
                  multiple={true}
                  
                  value={selectedUsers}
                  onChange={(e) => {
                    setSelectedUser(
                      users.find(
                        (user) => user.id === parseInt(e.target.value)
                      )
                    )
                    selectedUsers.push(parseInt(e.target.value));
                  }
                }
                >
                  <option value="">Select the user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.email} - {user.type}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>

    <CCol xs={12}>
      <CRow>
        <CCol xs={4}></CCol>
        <CCol xs={4}></CCol>
        <CCol xs={4}>
          <CRow className="align-items-end">
            <CCol xs={3}></CCol>
            <CCol xs={4}>
              <CRow>
                <CButton color="primary" type="submit" className="ms-2">
                  Submit
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

export default ServerGroupMonitorDetails;