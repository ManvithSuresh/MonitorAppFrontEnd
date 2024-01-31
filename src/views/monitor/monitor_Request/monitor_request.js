import React from "react";
import { CTableDataCell, CTableRow } from "@coreui/react";
import { Link } from "react-router-dom"; 

function MonitorRequest(props) {
  const item = props.item;

  return (
    <CTableRow key={item.id}>
      <CTableDataCell>{item.id}</CTableDataCell>
      <CTableDataCell>
      
        <Link to={`/monitor-request-detail/`+item.id} className="nav-link">
          {item.name}
        </Link>
      </CTableDataCell>
      {/* <CTableDataCell>{item.server.host + ':' + item.server.port}</CTableDataCell>  */}
      <CTableDataCell>{item.server ? `${item.server.host}:${item.server.port}` : 'N/A'}</CTableDataCell> 
      {/* <CTableDataCell>
        {item.database ? (
          <span>{item.database.host + ':' +item.database.port}</span>
        ) : (
          <span>No database data available</span>
        )}
      </CTableDataCell> */}

      <CTableDataCell>
      {item.users.map((user) => (
          <div key={user.id}>
          {user.name}</div>
        ))}
        </CTableDataCell>
    </CTableRow>
  );
}

export default MonitorRequest;
