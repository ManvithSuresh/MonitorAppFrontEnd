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
// import { getMonitorStatus } from "../../../services/monitor-service/monitor-status-service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Pagination from "../../pagination/Pagination";

// function MonitorStatusList() {
//   const [monitorStatusList, setMonitorStatusList] = useState([]);

//   const [noOfRows, setNoOfRows] = useState(4);
//   const [selectedPage, setSelectedPage] = useState(1);
//   //for counting mails
//   let sentCount = 0;
//   useEffect(() => {
//     fetchMonitorStatusList();
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

//   const fetchMonitorStatusList = () => {
//     getMonitorStatus()
//       .then((response) => {
//         console.log(response);
//         const monitorStatusList = response.data;
//         setMonitorStatusList(monitorStatusList);
//         showSuccessToast("Successfully fetched all Monitor Status items.");
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
//                 <h4>Servers Status Detail</h4>  
//               </CCol>
//             </CRow>
//           </CCardHeader>
//           <CCardBody>
//             <p className="text-medium-emphasis small">
//               List of all Server Status Details
//             </p>
//             {monitorStatusList && monitorStatusList.length === 0 ? (
//               <div>No Server Status...</div>
//             ) : (
//               <CTable hover>
//                 <CTableHead>
//                   <CTableRow>
//                     <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Server</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Mail Sent</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   {monitorStatusList.map((item, index) => {
//                     if (item.isSent) {
//               sentCount++;
//             }
//                     let monitorStatus;

//                     if (
//                       index >= (selectedPage - 1) * noOfRows &&
//                       index < selectedPage * noOfRows
//                     ) {
//                       const mailSentButton = item.isSent ? (
//                         <CButton color="success" shape="rounded-pill">
//                           Sent
//                         </CButton>
//                       ) : (
//                         <CButton color="danger" shape="rounded-pill">
//                           Not Sent
//                         </CButton>
//                       );

//                       monitorStatus = (
//                         <CTableRow key={item.id}>
//                           <CTableHeaderCell scope="row">
//                             {index + 1}
//                           </CTableHeaderCell>
//                           <CTableDataCell>
//                             {item.server.host + ":" + item.server.port}
                          
//                           </CTableDataCell>
                          
//                           <CTableDataCell>{item.user.name}</CTableDataCell>
//                           <CTableDataCell>{mailSentButton}</CTableDataCell>
//                         </CTableRow>
//                       );
//                     }

//                     return monitorStatus;
//                   })}
//                 </CTableBody>
//               </CTable>
//             )}
//             <Pagination
//               selectedPage={selectedPage}
//               setSelectedPage={setSelectedPage}
//               objects={monitorStatusList}
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

// export default MonitorStatusList;
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
import { getMonitorStatus } from "../../../services/monitor-service/monitor-status-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../pagination/Pagination";

function MonitorStatusList() {
  const [monitorStatusList, setMonitorStatusList] = useState([]);
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    fetchMonitorStatusList();
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

  const fetchMonitorStatusList = () => {
    getMonitorStatus()
      .then((response) => {
        console.log(response);
        const monitorStatusList = response.data;
        setMonitorStatusList(monitorStatusList);

        // Count the number of sent items
        const sentItemsCount = monitorStatusList.filter((item) => item.isSent).length;
        setSentCount(sentItemsCount);
        
        if(monitorStatusList && monitorStatusList >0){
          showSuccessToast("Successfully fetched all Monitor Status items.");
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
                <h4>Servers Status Detail</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              List of all Server Status Details
            </p>
            {monitorStatusList && monitorStatusList.length === 0 ? (
              <div>No Server Status...</div>
            ) : (
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sl No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Server</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mail Sent</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {monitorStatusList.map((item, index) => {
                    let monitorStatus;

                    if (
                      index >= (selectedPage - 1) * noOfRows &&
                      index < selectedPage * noOfRows
                    ) {
                      const mailSentButton = item.isSent ? (
                        <CButton color="success" shape="rounded-pill">
                          Sent
                        </CButton>
                      ) : (
                        <CButton color="danger" shape="rounded-pill">
                          Not Sent
                        </CButton>
                      );

                      monitorStatus = (
                        <CTableRow key={item.id}>
                          <CTableHeaderCell scope="row">
                            {index + 1}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            {item.server.host + ":" + item.server.port}
                          </CTableDataCell>
                          <CTableDataCell>{item.user.name}</CTableDataCell>
                          <CTableDataCell>{mailSentButton}</CTableDataCell>
                        </CTableRow>
                      );
                    }

                    return monitorStatus;
                  })}
                </CTableBody>
              </CTable>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={monitorStatusList}
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

export default MonitorStatusList;
