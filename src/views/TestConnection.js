import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
  CCard,
  CCardHeader,
} from '@coreui/react';
import { addTestConnection, getConnectionInfoById } from '../services/monitor-service/TestConnectionService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../scss/_custom.scss";
const TestConnection = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [databaseType, setDatabaseType] = useState('');

  const [validated, setValidated] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);
 



  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const TestConnectionData = {
      url,
      username,
      password,
      databaseType,
  
    };

  try {
      // Add the test connection
      const response = await addTestConnection(TestConnectionData);
      const connectionId = response.data.id;

      // Fetch connection info for the specific ID
      const connectionResponse = await getConnectionInfoById(connectionId);
      console.log(connectionResponse);
      const connectionResult = connectionResponse.data.connectionResult
      console.log(connectionResult);
    //   const toastMessage = connectionResult
    //   ? 'Test connection successful!'
      
    //   : 'Test connection unsuccessful';
    const toastMessage = connectionResult ? 'Test connection successful!' : 'Test connection unsuccessful';
     
    
    setConnectionResult({
        ...connectionResult,
        [url]: connectionResult,
      });
    // Display success toast with connection info
    toast.success(toastMessage, {
        className: connectionResult ? 'toast-success' : 'toast-failure',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    } catch (err) {
      // Display error toast
      toast.error(`Test connection failed: ${err.message}`, {
        className: 'toast-failure',
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleClear = () => {
    setUrl('');
    setUsername('');
    setPassword('');
    setDatabaseType('');
    setValidated(false);
    setConnectionResult(null);
  };

  return (
    <CRow>
      <CCol xs="12 ">
        <CCard>
          <CCardHeader>
            <strong>Test Connection</strong>
          </CCardHeader>

          <CForm className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md="6">
              <CFormLabel htmlFor="url">URL</CFormLabel>
              <CFormInput
                type="text"
                id="url"
                placeholder="jdbc:mysql://hostname:portno/yourdatabase"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>

            <CCol md="6">
              <CFormLabel htmlFor="username">Username</CFormLabel>
              <CFormInput
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>

            <CCol md="6">
              <CFormLabel htmlFor="password">Password</CFormLabel>
              <CFormInput
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>

            <CCol md="6">
              <CFormLabel htmlFor="databaseType">Database Type</CFormLabel>
              <CFormSelect
                id="databaseType"
                value={databaseType}
                onChange={(e) => setDatabaseType(e.target.value)}
                required
              >
                <option value="">Select Database Type</option>
                <option value="mysql">MySQL</option>
                <option value="postgre">PostgreSQL</option>
                <option value="maria">MariaDB</option>
              </CFormSelect>
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>

            <CCol xs={12}>
              <CRow>
                <CCol xs={4}></CCol>
                <CCol xs={4}></CCol>
                <CCol xs={4}>
                  <CRow className="align-items-end">
                    <CCol xs={1}></CCol>
                    <CCol xs={5}>
                      <CRow>
                        <CButton
                          color="primary"
                          type="submit"
                          className="ms-2"
                        >
                          Test Connection
                        </CButton>
                      </CRow>
                    </CCol>
                    <CCol xs={1}></CCol>
                    <CCol xs={3}>
                      <CRow>
                        <CButton
                          color="danger"
                          type="button"
                          className="ms-2"
                          onClick={handleClear}
                        >
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

          
          <ToastContainer />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default TestConnection;
