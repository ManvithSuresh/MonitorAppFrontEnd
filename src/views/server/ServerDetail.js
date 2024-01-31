import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import { useParams } from 'react-router-dom';
import { getServerById, addServers, updateServers, getServers } from '../../services/server-service';
import { useNavigate } from 'react-router-dom';
import CIcon from "@coreui/icons-react";
import { cilTrash } from '@coreui/icons';

import { CToast, CToaster } from '@coreui/react';
const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const serverId = params.serverId;
  const [toasts, setToasts] = useState([]);
  const [serviceName ,setServiceName] = useState('');
  const [server, setServer] = useState({});
  const [groupName, setGroupName] = useState('');
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [ports, setPorts] = useState([{ ports: '', serviceName: '' }]);
  const [isValidHost, setIsValidHost] = useState(true);


  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getServers();
  }, []);


  const getServers = () => {
    if (serverId) {
      getServerById(serverId)
        .then((response) => {
          const serverData = response.data;
          setServer(serverData);
          setName(serverData.name);
          setHost(serverData.host);
          
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getServers();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true); 
      return;  
    }
    setValidated(true);

    if (serverId) {
      // Update
      const serverData = {
        name,
        host,
        ports,
      };
      updateServers(serverId, serverData)
        .then(() => {
          navigate("/server-list");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Create
      const serverData = {
        name,
        host,
        ports,
      };
      addServers(serverData)
        .then(() => {
          navigate("/server-list");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (index) => {
    const updatedPorts = [...ports];
    updatedPorts.splice(index, 1);
    setPorts(updatedPorts);  

  };

  const handlePortChange = (index, key, value) => {
    const updatedPorts = [...ports];
    updatedPorts[index] = { ...updatedPorts[index], [key]: value };
    setPorts(updatedPorts);
  };

  const addPort = () => {
    setPorts([...ports, { ports: '', serviceName: '' }]);
  };


  const handleClear = () => {
 setName('')
 setHost('')
 setPorts([{ ports: '', serviceName: '' }])
  };

  const handleHostChange = (value) => {
    setHost(value);
    const isValid = /^[0-9.]+$/.test(value);
    setIsValidHost(isValid);
  };



  return (
    
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
     
<CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Server Name</CFormLabel>
        <CFormInput type='text' id="validationCustom02" required value={name} onChange={(e) => setName(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please provide a server name.</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Server Host</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom03"
          value={host}
          onChange={(e) => handleHostChange(e.target.value)}
          className={!isValidHost && 'is-invalid'}
        />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        {!isValidHost && (
          <CFormFeedback invalid>
            Please provide a valid numeric host address (e.g. 172.13.44.5)
          </CFormFeedback>
        )}
      </CCol>

      <CCol md={6}>
  <CFormLabel>Services</CFormLabel>
  {ports.map((port, index) => (
    <div key={index} className="d-flex mb-3">
      <div className="me-3">
        <CFormInput
          type="number"
          placeholder="Port"
          required
          value={port.ports}
          onChange={(e) => handlePortChange(index, 'ports', e.target.value)}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please provide a port number</CFormFeedback>
      </div>
      <div>
        <CFormInput
          type="text"
          placeholder="Service Name"
          required
          value={port.serviceName}
          onChange={(e) => handlePortChange(index, 'serviceName', e.target.value)}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please provide a service name</CFormFeedback> {/* Add feedback for invalid case */}

      </div>
      {index > 0 && (
        <div className="ms-3" style={{ cursor: 'pointer', color: 'black' }} onClick={() => handleDelete(index)}>
          <CIcon icon={cilTrash} />

        </div>
      )}
    </div>
  ))}
  <CButton color="primary" onClick={addPort}>
    Add more Services
  </CButton>
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
                  <CButton color="secondary" type="button" className="ms-2" onClick={handleClear}>
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

function ServerDetail() {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Server Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the Server
            </p>
            {Details()}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default ServerDetail;
