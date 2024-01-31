  import React, { useState, useEffect } from 'react';
  import { get_warn_logs } from '../../services/logs-service';

  function Alerts() {
    const [totalLogs, setTotalLogs] = useState(0);
    const [alertData, setAlertData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAlerts, setSelectedAlerts] = useState([]);

    useEffect(() => {
      const fetchData = () => {
        get_warn_logs()
          .then((response) => {
            console.log('Full response:', response);

            if (response.status !== 200) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Assuming the response.data is a string containing logs
            const logsArray = response.data.split('\n').map((log) => {
              const match = log.match(/(\d{2}:\d{2}:\d{2}\.\d{3}) \[.*\] (?:WARN .*) - (.*)/);
              if (match) {
                const timestamp = match[1];
                const message = match[2];
                return { timestamp, message };
              } else {
                // Handle logs that don't match the expected pattern
                return { timestamp: '', message: log };
              }
            });
            setAlertData(logsArray);
            setLoading(false);
            setTotalLogs(logsArray.length);
          })
          .catch((error) => {
            console.error('Error fetching data:', error.message);
            setError('Error fetching data. Please try again.');
            setLoading(false);
          });
      };

      fetchData();
    }, []);

    const handleCheckboxChange = (index) => {
      const updatedSelectedAlerts = [...selectedAlerts];
      updatedSelectedAlerts[index] = !updatedSelectedAlerts[index];
      setSelectedAlerts(updatedSelectedAlerts);
    };

    const handleClearSelectedAlert = (index) => {
      const updatedAlertData = [...alertData];
      updatedAlertData.splice(index, 1);
      setAlertData(updatedAlertData);
      const updatedSelectedAlerts = [...selectedAlerts];
      updatedSelectedAlerts.splice(index, 1);
      setSelectedAlerts(updatedSelectedAlerts);
      setTotalLogs(updatedAlertData.length);
    };

    const handleClearSelectedAlerts = () => {
      const hasSelected = selectedAlerts.some((selected) => selected);
      if (hasSelected) {
        const updatedAlertData = alertData.filter((_, index) => !selectedAlerts[index]);
        setAlertData(updatedAlertData);
        setSelectedAlerts([]);
        setTotalLogs(updatedAlertData.length);
      }
    };

    return (
      <div className="card" style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px', maxHeight: '500px', overflowY: 'auto' }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <div>
          
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Alerts Began</th>
                  <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Message</th>
                  <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Select</th>
                  <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Clear</th>
                </tr>
              </thead>
              <tbody>
                {alertData.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.timestamp}</td>
                    <td style={{ border: '1px solid black', padding: '8px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.message}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <input
                        type="checkbox"
                        checked={selectedAlerts[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <button onClick={() => handleClearSelectedAlert(index)}>Clear</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  export default Alerts;
