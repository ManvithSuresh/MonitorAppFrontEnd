import React from "react";
import {
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";

import { NavLink, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilTask } from "@coreui/icons";

function ServerGroup(props) {
  const navigate = useNavigate();

  const handleOnClickUser = (servergroup) => {
    navigate("/server-detail", servergroup);
  };

  const item = props.item;

  return (
    <CTableRow key={item.id}>
      <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
      <CTableDataCell >
      
          {item.groupName}
       
      </CTableDataCell>
      


  <CTableDataCell>
    {Array.isArray(item.services.ports) ? (
      item.services.ports.map((port, index) => (
        <div key={index}>
          {port}
        </div>
      ))
    ) : (
   
      <div>Invalid ports data</div>
    )}
  </CTableDataCell>
</CTableRow>

  );
}

export default ServerGroup;
