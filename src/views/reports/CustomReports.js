import React, { useState, useEffect } from 'react';
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
} from "@coreui/react";
import { getLogsByDateTimeAndLevel } from '../../services/logs-service'; // Replace with the actual path

function CustomReports() {
    const [schedule, setSchedule] = useState({
        logLevel: '',
        startTime: '',
        endTime: ''
    });
    const [logs, setLogs] = useState([]);
    const [validated, setValidated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLogsForPage(currentPage);
    }, [schedule.logLevel, schedule.startTime, schedule.endTime, currentPage]);

    const fetchLogsForPage = async (page) => {
        setLoading(true);
        setError(null);
    
        try {
            console.log('Fetching logs with parameters:', schedule.logLevel, schedule.startTime, schedule.endTime);
    
            const logsData = await getLogsByDateTimeAndLevel(
                schedule.logLevel,
                schedule.startTime,
                schedule.endTime
            );
    
            console.log('Logs Data:', logsData);
    
            // Assuming the response contains an array of logs
            setLogs(logsData);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setError('Error fetching logs. Please try again.');
        } finally {
            setLoading(false);
        }
    };
 const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);

    // Check if all required fields are filled
    if (schedule.logLevel && schedule.startTime && schedule.endTime) {
        // All required fields are filled, proceed with API call
        fetchLogsForPage(currentPage);
    } else {
        // Some required fields are missing, handle accordingly (you can show an error message)
        console.error('Please fill in all required fields.');
    }
};


    const handleLogLevelChange = (event) => {
        setSchedule({ ...schedule, logLevel: event.target.value });
    };
const formatDate = (date) => {
    // Ensure date is a valid Date object
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Format the date to match the expected format on the backend
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000); // Adjust for timezone offset
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};

    
    
    

    
    const handleStartTimeChange = (event) => {
        setSchedule({ ...schedule, startTime: formatDate(event.target.value) });
    };
    
    const handleEndTimeChange = (event) => {
        setSchedule({ ...schedule, endTime: formatDate(event.target.value) });
    };
    
   
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        fetchLogsForPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchLogsForPage(currentPage - 1);
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <h4>Select a Source</h4>
                    </CCardHeader>
                    <CCardBody>
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol md={6}>
                                <CFormLabel htmlFor="logLevel">Log Level</CFormLabel>
                                <CFormSelect
                                    id="logLevel"
                                    required
                                    value={schedule.logLevel}
                                    onChange={handleLogLevelChange}
                                    className={validated && !schedule.logLevel ? 'is-invalid' : ''}
                                >
                                    <option value="">Select Log Level</option>
                                    <option value="error">Error</option>
                                    <option value="warn">Warn</option>
                                    <option value="info">Info</option>
                                </CFormSelect>
                                <CFormFeedback>Please select a log level.</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
    <CFormLabel htmlFor="startTime">Start Time</CFormLabel>
    <CFormInput
        type="datetime-local"
        id="startTime"
        value={schedule.startTime}
        onChange={handleStartTimeChange}
    />
</CCol>

<CCol md={6}>
    <CFormLabel htmlFor="endTime">End Time</CFormLabel>
    <CFormInput
        type="datetime-local"
        id="endTime"
        value={schedule.endTime}
        onChange={handleEndTimeChange}
    />
</CCol>

                            <CCol md={12}>
                                <CButton type="submit" color="primary">
                                    Submit
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>

                {/* Display logs for the current page */}
                <CCard>
                    <CCardHeader>
                        <h4>Logs (Page {currentPage})</h4>
                    </CCardHeader>
                    <CCardBody>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {Array.isArray(logs) && logs.length === 0 && <p>No logs found for the specified criteria.</p>}
                        {Array.isArray(logs) && logs.map((log, index) => (
                            <div key={index}>
                                <strong>{log.timestamp}</strong>: {log.message}
                            </div>
                        ))}
                    </CCardBody>
                </CCard>

                {/* Pagination buttons */}
                <CRow>
                    <CCol md={6}>
                        <CButton onClick={handlePrevPage} color="primary" disabled={currentPage === 1}>
                            Previous Page
                        </CButton>
                    </CCol>
                    <CCol md={6} className="text-end">
                        <CButton onClick={handleNextPage} color="primary">
                            Next Page
                        </CButton>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    );
}

export default CustomReports;
