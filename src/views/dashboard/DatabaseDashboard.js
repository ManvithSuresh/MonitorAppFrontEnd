import React, { useState, useEffect } from 'react';
import { databaseStatusInfo } from '../../services/task-manager-service';
import { CContainer, CRow, CCol, CCard, CCardBody, CWidgetStatsA } from '@coreui/react';

const DatabaseStatus = () => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data using the Axios function
    databaseStatusInfo()
      .then(response => {
        setStatusData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Define an array of variable names you want to display
  const displayVariableNames = [
    'Uptime',
    'Threads_connected',
    'Queries',
    'Aborted_clients',
    'Aborted_connects',
    'Connections',
    'Max_used_connections',
    'Slow_queries',
    // 'Ssl_cipher',
    // 'Ssl_version',
    // 'Table_open_cache_hits',
    'Select_scan',
    // 'Sort_rows',
    
  ];    

  // Filter statusData based on displayVariableNames
  const filteredStatusData = statusData.filter(status => displayVariableNames.includes(status.variableName));

  return (
    <CContainer>
      <CRow>
        <CCol md="12">
        
            <CCardBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <CRow>
                  {filteredStatusData.map((status, index) => (
                    <CCol key={index} sm="6" lg="3">
                      <CWidgetStatsA
                        color="primary"
                        value={status.value}
                        title={status.variableName}
                        footerSlot={<div className="text-muted">Last update: {new Date().toLocaleTimeString()}</div>}
                        className="mb-4"
                        
                      />
                    </CCol>
                  ))}
                </CRow>
              )}
            </CCardBody>
         
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default DatabaseStatus;
