import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CFormTextarea,
  CButton,
  CInputGroup,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import MonitorDatabaseStatusList from './monitor_Status/monitor_database_statusList';
import MonitorStatusList from './monitor_Status/monitor_statusList';
import MonitorWebserviceStatusList from './monitor_Status/monitor_webservice_statusList';

function EmailStats() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [cc, setCC] = useState('');
  const [body, setBody] = useState('');

  const [totalDatbaseCount, setTotalDatabaseCount] = useState(' ');
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  useEffect(() => {
    // Check conditions to enable/disable the Send button
    setIsSendButtonDisabled(!email || !subject || !body || totalDatbaseCount > 0);
  }, [email, subject, body, totalDatbaseCount]);

  const handleSendEmail = () => {
    // Assuming asynchronous email sending logic here
    // You can replace the following with your actual email sending code
    const emailTo = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&cc=${encodeURIComponent(cc)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailTo;
  };

  const handleClearFields = () => {
    setEmail('');
    setSubject('');
    setCC('');
    setBody('');
  };

  console.log('the count is ' + totalDatbaseCount);

  return (
    <CContainer>
      <CRow>
        <CCol xs={12}></CCol>
      </CRow>
      <CRow>
        <CCol xs={8}>
          <MonitorDatabaseStatusList totalDatabaseCount={totalDatbaseCount} />
          <MonitorStatusList />
          <MonitorWebserviceStatusList />
        </CCol>

        <CCol xs={4}>
          <CCard>
            <CCardHeader>
              <h3>Send Email</h3>
            </CCardHeader>
            <CCardBody>
              <CContainer>
                <CRow>
                  <CCol xs={12}>
                    <label htmlFor="email">To:</label>
                    <CInputGroup>
                      <CFormInput
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12}>
                    <label htmlFor="cc">CC:</label>
                    <CInputGroup>
                      <CFormInput
                        type="email"
                        id="cc"
                        placeholder="Enter CC email"
                        value={cc}
                        onChange={(e) => setCC(e.target.value)}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs={12}>
                    <label htmlFor="subject">Subject:</label>
                    <CInputGroup>
                      <CFormInput
                        type="text"
                        id="subject"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CCol xs={12}>
                  <label htmlFor="body">Body:</label>
                  <CInputGroup>
                    <CFormTextarea
                      id="body"
                      placeholder="Enter email body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows="5"
                    />
                  </CInputGroup>
                </CCol>

                <CRow>
                  <CCol xs={12}>
                    <CButton
                      color="primary"
                      onClick={handleSendEmail}
                      className="w-100"
                      disabled={isSendButtonDisabled}
                    >
                      Send
                    </CButton>
                  </CCol>
                  <CCol xs={12} className="mt-2">
                    <CButton
                      color="secondary"
                      onClick={handleClearFields}
                      className="w-100"
                    >
                      Clear
                    </CButton>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default EmailStats;
