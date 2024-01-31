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
      CInputGroup,
      CFormSelect,
    } from '@coreui/react';
    import { useParams } from 'react-router-dom';
    import { getServers, getServicesById, addServices, updateServices, getAllPorts } from '../../services/server-service';
    import { useNavigate } from 'react-router-dom';
    const Details = () => {
      const navigate = useNavigate();
      const params = useParams();
      const serverId = params.serverId;
      const [server, setServer] = useState({});
      const [ports, setPorts] = useState([]);
      const [groupName, setGroupName] = useState('');
      const [selectedPorts, setSelectedPorts] = useState([]);
      const [validated, setValidated] = useState(false);

      useEffect(() => {
        loadPorts();
      }, []);
      const loadPorts = async () => {
        try {
          const response = await getServers();
          const serversData = response.data;
    
          if (serversData.length > 0) {
            const selectedServer = serversData[0];
    
            if (selectedServer && selectedServer.ports) {
              setServer(selectedServer);
              
              // Extract only the required fields (ports and serviceName) from ports
              const extractedPorts = selectedServer.ports.map(({ ports }) => ports);
              
              setPorts(extractedPorts);
            } else {
              console.error('Selected server or ports are undefined.');
            }
          } else {
            console.error('No servers data available.');
          }
        } catch (error) {
          console.error('Error fetching ports:', error);
        }
      };

      useEffect(() => {
        console.log('Ports:', ports);
      }, [ports]);

      useEffect(() => {
        console.log('Selected Ports:', selectedPorts);
      }, [selectedPorts]);

      const handleSubmit = (event) => {
        event.preventDefault();
      
      
        const selectedPortsData = selectedPorts.map((port) => ({
          ports: port.ports,
          serviceName: port.serviceName,
        }));
      
        const serverData = {
          groupName,
          services: {
            ports: selectedPorts.map((port) => parseInt(port)),
          },
        };
        
        if (serverId) {
          // Update
          updateServices(serverId, serverData)
            .then(() => {
              console.log('Services updated successfully:', serverData);
              navigate("/server-list");
            })
            .catch((err) => {
              console.error('Error updating services:', err);
            });
        } else {
          // Create
          addServices(serverData)
            .then(() => {
              console.log('Services added successfully:', serverData);
              navigate("/server-list");
            })
            .catch((err) => {
              console.error('Error adding services:', err);
            });
        }
      };
      
      const handleClear = () => {
        setGroupName('');
        setSelectedPorts([]);
      };

      return (
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={6}>
            <CFormLabel htmlFor="validationCustom02">Group Name</CFormLabel>
            <CFormInput type="text" id="validationCustom02" required value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please provide a  name.</CFormFeedback>
      
          </CCol>

          <CFormSelect
  id="validationCustom03"
  multiple
  defaultValue={selectedPorts.map((port) => port.toString())}
  onChange={(e) => {
    const selectedPortIds = Array.from(e.target.selectedOptions, (option) => option.value);
    // Use the selectedPortIds directly as an array
    setSelectedPorts(selectedPortIds);
  }}
>
  {ports && ports.length > 0 ? (
    ports.map((port) => (
      <option key={port} value={port.toString()}>
        {port}
      </option>
    ))
  ) : (
    <option value="">Loading ports...</option>
  )}
</CFormSelect>


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
    function ServerGroupDetail() {
      return (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h4>Server Group Details</h4>
              </CCardHeader>
              <CCardBody>
                <p className="text-medium-emphasis small">
                  Complete Detail of the Server Group
                </p>
                <Details />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      );
    }

    export default ServerGroupDetail;
