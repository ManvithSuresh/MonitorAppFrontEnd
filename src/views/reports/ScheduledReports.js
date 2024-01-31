import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CForm,
    CFormInput,
    CFormLabel,
    CFormFeedback,
    CFormSelect,
    CInputGroup,
    CInputGroupText 
} from "@coreui/react";

function ScheduledReports() {
    const [schedule, setSchedule] = useState({
        sourceReports: '',
        reportName: '',
        dateTime: '',
        frequency: 'notScheduled',
        notificationEmail: '',
    });

    const handleDownload = () => {
        
        const reports = [
            { name: 'Report 1', path: '/path/to/report1.pdf' },
            { name: 'Report 2', path: '/path/to/report2.pdf' },
            // Add more reports as needed
        ];

        // Find the selected report in the list
        const selectedReport = reports.find(report => report.name === schedule.sourceReports);

        if (selectedReport) {
            // For demonstration, let's simulate the download with an anchor tag
            const anchor = document.createElement('a');
            anchor.href = selectedReport.path;
            anchor.target = '_blank';
            anchor.download = selectedReport.name;
            anchor.click();
        } else {
            alert('No file selected for download.');
        }
    };


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                     <h4>   Select a Source</h4>
                    </CCardHeader>
                    <CCardBody>
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom01">Source Report</CFormLabel>
                                <CFormSelect
                                    type="text"
                                    id="validationCustom01"
                                    required
                                    value={schedule.sourceReports}
                                    onChange={(e) => setSchedule({ ...schedule, sourceReports: e.target.value })}
                                    isValid={validated && schedule.sourceReports.length > 0}
                                />
                                <CFormFeedback valid>Looks good!</CFormFeedback>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader>
                   <h4>    Schedule Date And Time (IST)</h4> 
                    </CCardHeader>  
                    <CCardBody>
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom02"> Report Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="validationCustom02"
                                    required
                                    value={schedule.reportName}
                                    onChange={(e) => setSchedule({ ...schedule, reportName: e.target.value })}
                                    isValid={validated && schedule.reportName.length > 0}
                                />
                                <CFormFeedback valid>Looks good!</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor='validationCustom03'>Date and Time</CFormLabel>
                                <CFormInput
                                    type="datetime-local"
                                    id="validationCustom03"
                                    required
                                    value={schedule.dateTime}
                                    onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                    isValid={validated && schedule.dateTime.length > 0}
                                />
                                <CFormFeedback valid>Looks good!</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom05">Frequency</CFormLabel>
                                <select
                                    id="validationCustom05"
                                    className="form-select"
                                    value={schedule.frequency}
                                    onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value })}
                                >
                                    <option value="notScheduled">Not Scheduled</option>
                                    <option value="oneTime">One Time</option>
                                    <option value="every15">Every 15 Minutes</option>
                                    <option value="every30">Every 30 Minutes</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </CCol>

                            {/* Add specific input fields based on frequency */}
                            {schedule.frequency === 'oneTime' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom06'>One Time at</CFormLabel>
                                    <CFormInput
                                        type="datetime-local"
                                        id="validationCustom06"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'every15' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom07'>Every 15 Minutes</CFormLabel>
                                    <CFormInput
                                        type="time"
                                        id="validationCustom07"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'every30' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom08'>Every 30 Minutes</CFormLabel>
                                    <CFormInput
                                        type="time"
                                        id="validationCustom08"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'hourly' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom09'>Hourly</CFormLabel>
                                    <CFormInput
                                        type="time"
                                        id="validationCustom09"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'daily' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom10'>Daily</CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="validationCustom10"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'weekly' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom11'>Weekly</CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="validationCustom11"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                            {schedule.frequency === 'monthly' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor='validationCustom12'>Monthly</CFormLabel>
                                    <CFormInput
                                        type="date"
                                        id="validationCustom12"
                                        required
                                        value={schedule.dateTime}
                                        onChange={(e) => setSchedule({ ...schedule, dateTime: e.target.value })}
                                        isValid={validated && schedule.dateTime.length > 0}
                                    />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                            )}

                        </CForm>
                    </CCardBody>
                </CCard>

                

                <CButton type="submit" color="primary" className="ms-2">
                    Schedule Report
                </CButton>

                <CButton type="clear" color="danger" className="ms-2">
                    Clear
                </CButton>


            </CCol>
        </CRow>
    );
}

export default ScheduledReports;
