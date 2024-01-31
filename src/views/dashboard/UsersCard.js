  import React , {useState , useEffect} from 'react'

  import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import { CChartLine } from '@coreui/react-chartjs'
  import { getStyle, hexToRgba } from '@coreui/utils'
  import CIcon from '@coreui/icons-react'
  import { getAllUserLogs } from '../../services/users-log-service'
  import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
  } from '@coreui/icons'

  import avatar1 from '../../assets/images/avatars/1.jpg'
  import avatar2 from '../../assets/images/avatars/2.jpg'
  import avatar3 from '../../assets/images/avatars/3.jpg'
  import avatar4 from '../../assets/images/avatars/4.jpg'
  import avatar5 from '../../assets/images/avatars/5.jpg'
  import avatar6 from '../../assets/images/avatars/6.jpg'

  const Dashboard = () => {



    const [userLogs, setUserLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUserLogs();
                setUserLogs(response.data);
            } catch (error) {
                console.error('Error fetching user logs:', error);
            }
        };

        fetchData();
    }, []);
  

        
          
    return (
      <>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>User</CTableHeaderCell>
              <CTableHeaderCell>Login</CTableHeaderCell>
              <CTableHeaderCell>Logout</CTableHeaderCell>
             
              <CTableHeaderCell>Last Login</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {userLogs.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" icon={<CIcon icon={cilUser} />} status="success" />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.user.name}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.user.type}</span> | Registered: {item.user.email}
                  </div>
                </CTableDataCell>
               
                <CTableDataCell>{new Date(item.loginTime).toLocaleString()}</CTableDataCell>
                <CTableDataCell>{item.logoutTime ? new Date(item.logoutTime).toLocaleString() : '-'}</CTableDataCell>
               
                <CTableDataCell>{new Date(item.lastLogin).toLocaleString()}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </>
    );
  };
  



  export default Dashboard