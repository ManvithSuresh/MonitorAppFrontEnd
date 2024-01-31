import React, { useEffect, useState } from 'react';
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
  CCardBody,
  CCardHeader
} from '@coreui/react';
import { useParams } from 'react-router-dom';
import { getDatabaseRequestById, addDatabaseRequest, updateDatabaseRequest } from '../../services/database-service'
import { useNavigate } from 'react-router-dom';

const DatabaseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dbId = params.dbId; 

  const [database, setDatabase] = useState({});
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [instance, setInstance] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = () => {
    if (dbId) {
      getDatabaseRequestById(dbId) 
        .then((response) => {
          const databaseData = response.data;
          setDatabase(databaseData);
          setName(databaseData.name);
          setHost(databaseData.host);
          setPort(databaseData.port);
          setInstance(databaseData.instance);
          setPassword(databaseData.password);
          setType(databaseData.type);
          setUrl(databaseData.url);
          setUserName(databaseData.userName);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (dbId) {
      // Update
      setValidated(true);

      const databaseData = {
        id:dbId,
        name,
        host,
        port,
        instance,
        password,
        type,
        url,
        userName,
      };
      updateDatabaseRequest(dbId, databaseData) 
        .then(() => {
          navigate("/databases-list"); 
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Create
      setValidated(true);
      const databaseData = {
        name,
        host,
        port,
        instance,
        password,
        type,
        url,
        userName,
      };
      addDatabaseRequest(databaseData) 
    .then(() => {
          navigate("/databases-list"); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" required value={name} onChange={(e) => setName(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Host</CFormLabel>
        <CFormInput type="text" id ="validationCustom02" required value={host} onChange={(e) => setHost(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Port</CFormLabel>
        <CFormInput type="number" id="validationCustom03" required value={port} onChange={(e) => setPort(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom05">Instance</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required value={instance} onChange={(e) => setInstance(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom06">Password</CFormLabel>
        <CFormInput type="password" id="validationCustom06" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      {/* <CCol md={6}>
        <CFormLabel htmlFor="validationCustom07">Type</CFormLabel>
        <CFormInput type="text" id="validationCustom07" required value={type} onChange={(e) => setType(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol> */}
      <CCol md={6}>
  <CFormLabel htmlFor="validationCustom07">Type</CFormLabel>
  <CFormSelect id="validationCustom07" value={type} onChange={(e) => setType(e.target.value)} required>
    <option value="">Select Database Type</option>
    <option value="mysql">MySQL</option>
    <option value="postgre">PostgreSQL</option>
    <option value="maria">MariaDB</option>
  </CFormSelect>
  <CFormFeedback valid>Looks good!</CFormFeedback>
</CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom08">URL</CFormLabel>
        <CFormInput type="url" id="validationCustom08" required value={url} onChange={(e) => setUrl(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom09">User Name</CFormLabel>
        <CFormInput type="text" id="validationCustom09" required value={userName} onChange={(e) => setUserName(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
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
}

function DatabaseDetail() {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Database Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the Database
            </p>
            {DatabaseDetails()} 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DatabaseDetail;
