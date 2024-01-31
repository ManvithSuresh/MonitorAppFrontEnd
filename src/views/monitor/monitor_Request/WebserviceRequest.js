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
  getMonitorRequestWebserviceById,
  addMonitorWebserviceRequest,
  updateMonitorWebserviceRequest,
} from "../../../services/monitor-service/monitor-request-webservice-service";
import { getWebService } from "../../../services/ws-request-service";
import { listUsers } from "../../../services/user-service";
import { useNavigate } from "react-router-dom";

const WebServiceMonitorDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const webId = params.webId || "";
  console.log(webId);

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [Api, setApi] = useState([]);
  const [selectedApi, setSelectedApi] = useState({});

  const isEditMode = !!webId;

  // UseEffect for loading Selected Monitoring Request for Editing
  useEffect(() => {
    if (webId) {
      getMonitorRequestWebserviceById(webId)
        .then((response) => {
          console.log(response.data);

          setName(response.data.name);

          const webservice = response.data.webservice;
          setSelectedApi(webservice);

          const user = response.data.users
            ? response.data.users.length >= 1
              ? response.data.users[0]
              : {}
            : {};

          setSelectedUser(user);

          let sUsers = [];

          if (response.data.users) {
            for (let i = 0; i < response.data.users.length; i++) {
              let u = response.data.users[i];
              sUsers.push(u.id);
            }
          }

          setSelectedUsers(sUsers);
        })
        .catch((error) => {
          console.error("Error fetching webservices:", error);
        });
    }
  }, [webId]);

  // loading webservices
  useEffect(() => {
    getWebService()
      .then((response) => {
        console.log("the response is " + response);
        const webservice = response.data;
        setApi(webservice);
      })
      .catch((error) => {
        console.error("Error fetching webservice:", error);
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

    console.log("Selected webservice:", selectedApi);
    console.log("selected users:", selectedUsers);
    let sUsers = [];

    for (let i = 0; i < selectedUsers.length; i++) {
      sUsers.push(users.find((u) => u.id === selectedUsers[i]));
    }

    const requestData = {
      name,
      webservice: selectedApi,
      users: webId ? (sUsers.length > 0 ? sUsers : []) : [],
    };

    if (isEditMode) {
      // Update
      if (webId) {
        requestData.id = webId;
      }
      updateMonitorWebserviceRequest(webId, requestData)
        .then(() => {
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error updating monitor request:", error);
        });
    } else {
      // Adding
      addMonitorWebserviceRequest(requestData)
        .then((response) => {
          const reqData = response.data;
          if (sUsers.length > 0) {
            reqData.users = sUsers;
            updateMonitorWebserviceRequest(webId, reqData)
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
      <h5>WebService Details</h5>
    </CCardHeader>
    <CCardBody>
      <CFormLabel htmlFor="webserviceSelect">WebServices</CFormLabel>
      <CInputGroup>
        <CFormSelect
          id="webserviceSelect"
          value={selectedApi ? selectedApi.id : ""}
          onChange={(e) =>
            setSelectedApi(
              Api.find(
                (webservice) => webservice.id === parseInt(e.target.value)
              )
            )
          }
        >
          <option value="">Choose a webservice</option>
          {Api.map((webservice) => (
            <option key={webservice.id} value={webservice.id}>
              {webservice.url}
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

export default WebServiceMonitorDetails;
