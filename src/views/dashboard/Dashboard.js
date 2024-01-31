import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCardFooter,CButton
} from "@coreui/react";

import { getServers  , getServices} from "../../services/server-service";
import {getDatabaseRequest} from "../../services/database-service"; 
import {listWSRequests} from "../../services/ws-request-service";
import EmailStats from '../../views/dashboard/EmailStats';


import { NavLink, useNavigate } from "react-router-dom";

import {
  cilEnvelopeClosed,
  cilWarning,
  cilAlarm,
  cilUser,
  cilSync,
  cilZoomIn

} from "@coreui/icons";
import CIcon from "@coreui/icons-react";


function Dashboard() {
  const [expandedChart, setExpandedChart] = useState(null);
  const [serverData, setServerData] = useState([]);

  const [databaseData, setDatabaseData] = useState([]);
  const [webServiceData, setWebServiceData] = useState([]);

 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLogs, setTotalLogs] = useState(0);
  const [serviceData,setServiceData] = useState([])
  const navigate = useNavigate();
  const problemsRef = useRef(null);
  const controls = useAnimation(); 
 



//refersh button
  const refreshData = () => {
    fetchData(); 
  };

  const handleClickToProblems = (problems) => {
    navigate("/problems-card" , problems)
  }

  const handleOnClickUser = (mail) => {
    navigate("/email-stats", mail);
  };

  const handleOnclickToUsersCard = (userCard) =>{
    navigate("/users-card", userCard)
  }


  const handleOnClickToAlertsCard = (alertsCard) => {
    navigate("/alerts-card" , alertsCard)
  }

  const handleZoomInClick = (serverStatus) => {
   navigate("/Server-Status" , serverStatus);

  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesResponse = await getServices();
      setServiceData(servicesResponse.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Error fetching services data.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [serversResponse] =
        await Promise.all([
          getServers(),
       
        ]);

      
      setServerData(serversResponse.data);
      
      
    
      fetchServices();
    } catch (error) {
      console.error(error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const handleZoomInClickForDatabase = (databaseStatus) => {
    navigate("/Database-Status", databaseStatus);
  };

  const handleZoomInClickForWebService = (webServiceStatus) => {
    navigate("/WebService-Status", webServiceStatus);
  };

  const fetchDatabaseData = async () => {
    try {
      setLoading(true);
      const databaseResponse = await getDatabaseRequest();
      setDatabaseData(databaseResponse.data);
    } catch (error) {
      console.error("Error fetching database data:", error);
      setError("Error fetching database data.");
    } finally {
      setLoading(false);
    }
  };


  const fetchWebServiceData = async () => {
    try {
      setLoading(true);
      const webServiceResponse = await listWSRequests();
      setWebServiceData(webServiceResponse.data);
    } catch (error) {
      console.error("Error fetching web service data:", error);
      setError("Error fetching web service data.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
    fetchDatabaseData(); 
    fetchWebServiceData(); 
  }, []);

  


  

  return (
    <CContainer fluid>  
      <div>
        <CRow className="mb-4">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

            <CRow>
              {/* <CCol style={{ width: "15 rem", height: "10rem" }}>
              <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={controls}
                  onClick={handleOnClickUser}
                  style={{ cursor: "pointer" }}
                
                >
                <CCard>
                  <CCardBody>
                    <CIcon icon={cilEnvelopeClosed} size="lg" />
                    <h5>23</h5>
                    <h6 className="text-medium-emphasis small">Email Sent</h6>
                  </CCardBody>
                </CCard>
                </motion.div>
              </CCol> */}

            <CCol style={{ width: "15rem", height: "10rem" }}>
              <motion.div
                whileHover={{ scale: 1.1 }}x
                animate={controls}
                onClick={handleClickToProblems}
                style={{ cursor: "pointer" }}
           
              >


                <CCard>
                  <CCardBody>
                    <CIcon icon={cilWarning} size="lg" />
                    <h5>{totalLogs} problems found</h5>
                    <h6 className="text-medium-emphasis small">Problems</h6>
                  </CCardBody>
                </CCard>
              </motion.div>
            </CCol>

            <CCol style={{ width: "15rem", height: "10rem" }}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                animate={controls}
                onClick={handleOnClickToAlertsCard}
                style={{ cursor: "pointer" }}
              >
              <CCard>
                <CCardBody>
                  <CIcon icon={cilAlarm} size="lg" />
                  <h5>3 Alerts</h5>
                  <h6 className="text-medium-emphasis small">Alerts</h6>
                </CCardBody>
              </CCard>
              </motion.div>
            </CCol>
        
            <CCol style={{ width: "15rem", height: "10rem" }}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                animate={controls}
                
                onClick={handleOnclickToUsersCard}
                style={{ cursor: "pointer" }}
              >
              <CCard>
                <CCardBody>
                  <CIcon icon={cilUser} size="lg" />
                  <h5>3 Users</h5>
                  <h6 className="text-medium-emphasis small">Users</h6>

                </CCardBody>
              </CCard>
              </motion.div>
            </CCol>
          </CRow>

<CRow>
          <CCol>
              <CCard>
                <CCardHeader>
                  <h4>Server Status</h4>
                  <div style={{ position: 'absolute', top : "10px" ,right: '10px' }}>
                <CButton color="" onClick={refreshData}>
                  <CIcon icon={cilSync} size="lg" />
                </CButton>
              </div>
                </CCardHeader>

                <CCardBody>
                  <CTable hover>
                  <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Server Name</CTableHeaderCell>
                        <CTableHeaderCell>Host</CTableHeaderCell>
                        
                        {/* <CTableHeaderCell>Ram</CTableHeaderCell>
                        <CTableHeaderCell>CPU</CTableHeaderCell>
                        <CTableHeaderCell>Disk</CTableHeaderCell> */}
                        <CTableHeaderCell>Active Status</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                      </CTableHead>
                  
                      <CTableBody>
            {serverData.map((server) => (
              <CTableRow key={server.serverName}>
                <CTableDataCell>{server.name}</CTableDataCell>
                <CTableDataCell>{server.host}</CTableDataCell>
                {/* <CTableDataCell style={{ color: server.cpuUsage > 70 ? 'red' : 'inherit' }}>
                  70%
                </CTableDataCell>
                <CTableDataCell style={{ color: server.memoryUsage > 70 ? 'red' : 'inherit' }}>
                  90%
                </CTableDataCell>
                <CTableDataCell style={{ color: server.diskUsage > 70 ? 'red' : 'inherit' }}>
                  25%
                </CTableDataCell> */}
                <CTableDataCell>
                  <CButton
                    color={server.isActive ? "success" : "danger"}
                    disabled={!server.isActive}
                  >
                    {server.isActive ? "Active" : "Not Active"}
                  </CButton>
                 
                </CTableDataCell>
                <CTableDataCell>
  <CIcon
    icon={cilZoomIn}
    size="lg"
    onClick={() => handleZoomInClick()}
    style={{ cursor: 'pointer' }}
  />
</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
             
             
                  </CTable>

                  
                </CCardBody>
              </CCard>
            </CCol>
            </CRow>
          
            <div style={{ height: "30px" }} />

            <CRow>
            <CCol>
  <CCard>
    <CCardHeader>
     
      <h4>Server Groups</h4>
    </CCardHeader>
    <CCardBody>
      <CTable hover>
        <CTableHead>
          <CTableRow>
           
          
          </CTableRow>
        </CTableHead>
        <CTableBody>
        <CRow>
        {serviceData.map((servicesGroup) => (
  <CCol key={servicesGroup.groupName}>
    <CCard>
      <CCardHeader>
        <h4>{servicesGroup.groupName}</h4>
        <div style={{ position: 'absolute', top: "10px", right: '10px' }}>
          <CButton color="" onClick={refreshData}>
            <CIcon icon={cilSync} size="lg" />
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        {servicesGroup.services && servicesGroup.services.ports ? (
          <CTable hover>
            <CTableHead>
              <CTableRow>
             <CTableHeaderCell>Service</CTableHeaderCell>
             <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {servicesGroup.services.ports.map((port, index) => (
                <CTableRow key={`${servicesGroup.groupName}-${index}`}>
                  <CTableDataCell>{port}</CTableDataCell>
                  <CTableDataCell>
                  <CButton
                    color={port.isActive ? "success" : "danger"}
                    disabled={!port.isActive}
                  >
                    {port.isActive ? "Active" : "Not Active"}
                  </CButton>
                  </CTableDataCell>
                 
                 
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p>No valid services data.</p>
        )}
      </CCardBody>
    </CCard>
  </CCol>
))}

      </CRow>



        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
</CCol>



<div style={{ height: "30px" }} />
<CRow>
      <CCol>
              <CCard>
                <CCardHeader>
                  <h4>Database Status</h4>
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <CButton color="" onClick={fetchDatabaseData}>
                      <CIcon icon={cilSync} size="lg" />
                    </CButton>
                  </div>
                </CCardHeader>

                <CCardBody>
                  <CTable hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Database Name</CTableHeaderCell>
                        <CTableHeaderCell>Active Status</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>

                    <CTableBody>
                      {databaseData.map((database) => (
                        <CTableRow key={database.name}>
                          <CTableDataCell>{database.name}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color={database.isActive ? 'success' : 'danger'}
                              disabled={!database.isActive}
                            >
                              {database.isActive ? 'Active' : 'Not Active'}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CIcon
                              icon={cilZoomIn}
                              size="lg"
                              onClick={() => handleZoomInClickForDatabase(database)}
                              style={{ cursor: 'pointer' }}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
            </CRow>


           
          </CRow>


        
<div style={{ height: "30px" }} />  
          <CRow>
  <CCol>
    <CCard>
      <CCardHeader>
        <h4>Web Service Status</h4>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CButton color="" onClick={fetchWebServiceData}>
            <CIcon icon={cilSync} size="lg" />
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Service Name</CTableHeaderCell>
              <CTableHeaderCell>Http Method</CTableHeaderCell>
              <CTableHeaderCell>Active Status</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {webServiceData.map((webService) => (
              <CTableRow key={webService.url}>
                <CTableDataCell>{webService.url}</CTableDataCell>
                <CTableDataCell>{webService.httpMethod}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color={webService.isActive ? 'success' : 'danger'}
                    disabled={!webService.isActive}
                  >
                    {webService.isActive ? 'Active' : 'Not Active'}
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon
                    icon={cilZoomIn}
                    size="lg"
                    onClick={() => handleZoomInClickForWebService(webService)}
                    style={{ cursor: 'pointer' }}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

          </CRow>
        </div>
      </CContainer>
  );
}

export default Dashboard;
