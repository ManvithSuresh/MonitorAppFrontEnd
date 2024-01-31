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
import { listUsers } from "../../../services/user-service";
import {
  addMonitorDatabaseRequest,
  getMonitorRequestDatabaseById,
  updateMonitorDatabaseRequest,
} from "../../../services/monitor-service/monitor-request-database-service";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabaseRequest } from "../../../services/database-service";

const DatabaseMonitorDetails = () => {
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
  const [databases,setDatabases]=useState([]);
  const [selectedDatabase , setSelectedDatabase]=useState({});

  const isEditMode = !!requestId;

  // loading Selected Monitoring Request
  useEffect(() => {
    if (requestId) {
      getMonitorRequestDatabaseById(requestId)
        .then((response) => {
          console.log(response.data);

          setName(response.data.name);

          const database = response.data.server;
          setSelectedDatabase(database);

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
          console.error("Error fetching databases:", error);
        });
    }
  }, [requestId]);

  // loading databases
  useEffect(() => {
    getDatabaseRequest()
      .then((response) => {
        console.log(response);
        const databases = response.data;
        setDatabases(databases);
      })
      .catch((error) => {
        console.error("Error fetching databases:", error);
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

    console.log("Selected Database:", selectedDatabase);
    console.log("selected users:", selectedUsers);

    let sUsers = [];

    for (let i = 0; i < selectedUsers.length; i++) {
      sUsers.push(users.find((u) => u.id === selectedUsers[i]));
    }

    const requestData = {
      name,
      database: selectedDatabase,
      users: requestId ? (sUsers.length > 0 ? sUsers : []) : [],
    };

    // Assuming isEditMode is defined somewhere in your code
    if (isEditMode) {
      // Update
      if (requestId) {
        requestData.id = requestId;
      }
      updateMonitorDatabaseRequest(requestId, requestData)
        .then(() => {
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error updating monitor request:", error);
        });
    } else {
      // Adding
      addMonitorDatabaseRequest(requestData)
        .then((response) => {
          const reqData = response.data;
          if (sUsers.length > 0) {
            reqData.users = sUsers;
           updateMonitorDatabaseRequest(requestId, reqData)
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
    <CForm className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
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

      <CCol md={6}>
        <CCard>
          <CCardHeader>
            <h5>Database Details</h5>
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="databaseSelect">Databases</CFormLabel>
            <CInputGroup>
              <CFormSelect
                id="databaseSelect"
                value={selectedDatabase ? selectedDatabase.id : ""}
                onChange={(e) =>
                  setSelectedDatabase(
                    databases.find(
                      (database) => database.id === parseInt(e.target.value)
                    )
                  )
                }
              >
                <option value="">Choose the database</option>
                {databases.map((database) => (
                  <option key={database.id} value={database.id}>
                    {database.name} - {database.host}:{database.port}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={8}>
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
                    users.find((user) => user.id === parseInt(e.target.value))
                  );
                  selectedUsers.push(parseInt(e.target.value));
                }}
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

export default DatabaseMonitorDetails;
