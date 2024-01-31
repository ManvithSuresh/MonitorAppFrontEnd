import React, { useState, useEffect } from 'react';
import { get_error_logs } from '../../services/logs-service';

function Problems() {
  const [totalLogs, setTotalLogs] = useState(0);
  const [warnData, setWarnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblems, setSelectedProblems] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      get_error_logs()
        .then((response) => {
          console.log('Full response:', response);

          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Assuming the response.data is a string containing logs
          const logsArray = response.data.split('\n').map((log) => {
            const match = log.match(/(\d{2}:\d{2}:\d{2}\.\d{3}) \[.*\] (?:ERROR .*) - (.*)/);
            if (match) {
              const ProblemsBegan = match[1];
              const message = match[2];
              return { ProblemsBegan, message };
            } else {
              return { ProblemsBegan: '', message: log };
            }
          });
          setWarnData(logsArray);
          setLoading(false);

          // Set the totalLogs count
          setTotalLogs(logsArray.length);
        })
        .catch((error) => {
          console.error('Error fetching data:', error.message);
          setError('Error fetching data. Please try again.');
          setLoading(false);
        });
    };

    fetchData();
  }, [setTotalLogs]);

  const handleCheckboxChange = (index) => {
    const updatedSelectedProblems = [...selectedProblems];
    updatedSelectedProblems[index] = !updatedSelectedProblems[index];
    setSelectedProblems(updatedSelectedProblems);
  };

  const handleClearSelectedProblem = (index) => {
    const updatedWarnData = [...warnData];
    updatedWarnData.splice(index, 1);
    setWarnData(updatedWarnData);
    const updatedSelectedProblems = [...selectedProblems];
    updatedSelectedProblems.splice(index, 1);
    setSelectedProblems(updatedSelectedProblems);
    setTotalLogs(updatedWarnData.length);
  };

  const handleClearSelectedProblems = () => {
    const hasSelected = selectedProblems.some((selected) => selected);
    if (hasSelected) {
      const updatedWarnData = warnData.filter((_, index) => !selectedProblems[index]);
      setWarnData(updatedWarnData);
      setSelectedProblems([]);
      setTotalLogs(updatedWarnData.length);
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
                <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Problems Began</th>
                <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Message</th>
                <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Select</th>
                <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Clear</th>
              </tr>
            </thead>
            <tbody>
              {warnData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.ProblemsBegan}</td>
                  <td style={{ border: '1px solid black', padding: '8px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.message}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedProblems[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <button onClick={() => handleClearSelectedProblem(index)}>Clear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '16px' }}>
            <button onClick={handleClearSelectedProblems}>Clear Selected Problems</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Problems;
