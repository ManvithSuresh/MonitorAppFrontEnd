import React, { useEffect, useState } from 'react';
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormSelect,
  CButton,
  CFormTextarea,
  CFormLabel,
 
  CFormInput,
} from '@coreui/react';
import { showDatabase, saveDetails} from '../services/monitor-service/QueryEditorService';

const QueryEditor = () => {
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [query, setQuery] = useState('');
  const [queryName, setQueryName] = useState('');

  useEffect(() => {
    showDatabase()
      .then((response) => {
        const databases = response.data;
        setDatabases(databases);
      })
      .catch((error) => {
        console.error('Error fetching databases:', error);
      });
  }, []);

  const selectTables = async (databaseID) => {
    try {
      const response = await showDatabase(databaseID);
      const data = response.data;

      if (data.length === 0) {
        return [];
      }

      // Assuming 'tables' is a comma-separated string of table names
      const tables = data[0].tables.split(',');

      return tables;
    } catch (error) {
      console.error('Error fetching tables:', error);
      return [];
    }
  };

  const executeQuery = () => {
    // Implement the logic to execute the query
    console.log('Executing query:', query);
  };

  const saveQuery = async () => {
    try {
      // Check if required fields are filled
      if (!selectedDatabase || !selectedTable || !queryName ) {
        console.error('Please fill in all required fields.');
        return;
      }

      // Save the details using the saveDetails endpoint
      const response = await saveDetails(selectedDatabase, {
        queryName,
        selectedDatabase,
        selectedTable,
        query,
      });
      console.log('Sending the following data to the server:', requestData);
      console.log('Details saved successfully:', response.data);

      // You can add additional logic here, e.g., show a success message
    } catch (error) {
      console.error('Error saving details:', error);
      // Handle error, e.g., show an error message
    }
  };


  const clearForm = () => {
    setSelectedDatabase('');
    setSelectedTable('');
    setQueryName('');
    setQuery('');
  };

  const renderDatabaseOptions = () => {
    return [
      <option key="default" value="">
        Select a database
      </option>,
      ...databases.map((database) => (
        <option key={database.id} value={database.id}>
          {database.name}
        </option>
      )),
    ];
  };

  const renderTableOptions = () => {
    return [
      <option key="default" value="">
        Select a table
      </option>,
      ...tables.map((table) => (
        <option key={table} value={table}>
          {table}
        </option>
      )),
    ];
  };

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <strong>Query Editor</strong>
          </CCardHeader>
          <CCardBody>

          <CForm className="row g-3 needs-validation">
          <CCol md="12">
                
                <CFormLabel htmlFor="queryName">Query Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="queryName"
                  placeholder="Enter query name"
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                />
             
            </CCol>


            
              <CCol md="6">
                <CFormLabel htmlFor="databaseSelect">Select Database</CFormLabel>
                <CFormSelect
                  id="databaseSelect"
                  value={selectedDatabase}
                  onChange={async (e) => {
                    const selectedDatabaseID = e.target.value;
                    setSelectedDatabase(selectedDatabaseID);

                    // Fetch tables based on the selected database
                    const tables = await selectTables(selectedDatabaseID);
                    setTables(tables);
                  }}
                >
                  {renderDatabaseOptions()}
                </CFormSelect>
              </CCol>

              <CCol md="6">
                <CFormLabel htmlFor="tableSelect">Select Table</CFormLabel>
                <CFormSelect
                  id="tableSelect"
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                >
                  {renderTableOptions()}
                </CFormSelect>
              </CCol>

            

              <CCol xs="12">
                <CFormLabel htmlFor="queryTextarea">Query</CFormLabel>
                <CFormTextarea
                  id="queryTextarea"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </CCol>

              <CCol xs="12">
                <CButton color="primary" onClick={executeQuery}>
                  Execute
                </CButton>
                <CButton color="success" onClick={saveQuery}>
                  Save
                </CButton>
                <CButton color="danger" onClick={clearForm}>
                  Clear
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default QueryEditor;
