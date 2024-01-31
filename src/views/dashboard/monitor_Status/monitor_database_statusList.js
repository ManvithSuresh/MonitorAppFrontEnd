// import React, { useEffect, useState } from "react";
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CTableDataCell,
// } from "@coreui/react";
// import { getMonitorDatabaseStatus } from "../../../services/monitor-service/monitor-database-status-service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Pagination from "../../pagination/Pagination";

// function MonitorDatabaseStatusList() {
//   const [monitorDatabaseStatusList, setMonitorDatabaseStatusList] = useState([]);
//   const [noOfRows, setNoOfRows] = useState(4);
//   const [selectedPage, setSelectedPage] = useState(1);

//   useEffect(() => {
//     fetchMonitorDatabaseStatusList();
//   }, []);

//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   };

//   let sentCount = 0;

//   const showErrorToast = (message) => {
//     toast.error(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   };

//   const fetchMonitorDatabaseStatusList = () => {
//     getMonitorDatabaseStatus()
//       .then((response) => {
//         console.log(response);
//         const monitorDatabaseStatusList = response.data;
//         setMonitorDatabaseStatusList(monitorDatabaseStatusList);
//         showSuccessToast("Successfully fetched all Monitor Database Status items.");
//       })
//       .catch((error) => {
//         console.log(error);
//         showErrorToast(error.message);
//       });
//   };

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <CRow>
//               <CCol xs={11}>
//                 <h4>Database Status Detail</h4>
//               </CCol>
//             </CRow>
//           </CCardHeader>
//           <CCardBody>
//             <p className="text-medium-emphasis small">
//               List of all Database Status Details
//             </p>
//             {monitorDatabaseStatusList && monitorDatabaseStatusList.length === 0 ? (
//               <div>No Database Status...</div>
//             ) : (
//               <CTable hover>
//                 <CTableHead>
//                   <CTableRow>
//                     <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Database</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Mail Sent</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   {monitorDatabaseStatusList.map((item, index) => {
//                     if (item.isSent) {
//               sentCount++;
//             }
//                     return (
//                       <CTableRow key={item.id}>
//                         <CTableHeaderCell scope="row">
//                           {(selectedPage - 1) * noOfRows + index + 1}
//                         </CTableHeaderCell>
//                         <CTableDataCell>
//                           {item.database.host + ":" + item.database.port}
//                         </CTableDataCell>
//                         <CTableDataCell>{item.user.name}</CTableDataCell>
//                         <CTableDataCell>
//                           {item.isSent ? (
//                             <CButton color="success" shape="rounded-pill">
//                               Sent
//                             </CButton>
//                           ) : (
//                             <CButton color="danger" shape="rounded-pill">
//                               Not Sent
//                             </CButton>
//                           )}
//                         </CTableDataCell>
//                       </CTableRow>
//                     );
//                   })}
//                 </CTableBody>
//               </CTable>
//             )}
//             <Pagination
//               selectedPage={selectedPage}
//               setSelectedPage={setSelectedPage}
//               objects={monitorDatabaseStatusList}
//               noOfRows={noOfRows}
//               setNoOfRows={setNoOfRows}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//       <ToastContainer />
//     </CRow>
//   );
// }

// export default MonitorDatabaseStatusList;
import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";
import { getMonitorDatabaseStatus } from "../../../services/monitor-service/monitor-database-status-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../pagination/Pagination";

function MonitorDatabaseStatusList() {
  const [monitorDatabaseStatusList, setMonitorDatabaseStatusList] = useState([]);
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sentCount, setSentCount] = useState(0); // New state variable

  useEffect(() => {
    fetchMonitorDatabaseStatusList();
  }, []);

  const showSuccessToast = (message) => {
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

  const showErrorToast = (message) => {
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

  const fetchMonitorDatabaseStatusList = () => {
    getMonitorDatabaseStatus()
      .then((response) => {
        console.log(response);
        const monitorDatabaseStatusList = response.data;
        setMonitorDatabaseStatusList(monitorDatabaseStatusList);

        // Count the number of sent items
        const sentCount = monitorDatabaseStatusList.filter((item) => item.isSent).length;
        setSentCount(sentCount);
        if(monitorDatabaseStatusList && monitorDatabaseStatusList >0){
          showSuccessToast("Successfully fetched all Monitor Database Status items.");
        }
        else{

          console.log("No data found")
        }
        
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={11}>
                <h4>Database Status Detail</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all Database Status Details
            </p>
            {monitorDatabaseStatusList && monitorDatabaseStatusList.length === 0 ? (
              <div>No Database Status...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Database</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mail Sent</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {monitorDatabaseStatusList.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">
                        {(selectedPage - 1) * noOfRows + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell>
                        {item.database.host + ":" + item.database.port}
                      </CTableDataCell>
                      <CTableDataCell>{item.user.name}</CTableDataCell>
                      <CTableDataCell>
                        {item.isSent ? (
                          <CButton color="success" shape="rounded-pill">
                            Sent
                          </CButton>
                        ) : (
                          <CButton color="danger" shape="rounded-pill">
                            Not Sent
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={monitorDatabaseStatusList}
              noOfRows={noOfRows}
              setNoOfRows={setNoOfRows}
            />

            {/* Display the sent count */}
            <div>Total Sent: {sentCount}</div>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer />
    </CRow>
  );
}

export default MonitorDatabaseStatusList;
