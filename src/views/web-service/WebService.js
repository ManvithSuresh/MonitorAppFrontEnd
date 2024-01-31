import React from "react";


import {
    CTableDataCell,
    CTableHeaderCell,
    CTableRow,
    CButton
  } from "@coreui/react";
  import CIcon from "@coreui/icons-react";
import { cilTask } from "@coreui/icons";

import { NavLink } from "react-router-dom";

function WebService(props) {

  const handleOnClickWebService = (webService) => {
    navigate("/ws-request-detail", webService);
  };  

  const item = props.item  

  return (
    <CTableRow key={item.id}>
      <CTableHeaderCell scope="row">{(props.index + 1)}</CTableHeaderCell>
      <CTableDataCell onClick={(item) => handleOnClickWebService}>
        <NavLink to={"/ws-request-detail/" + item.id} name="Web Service Request Details">
          {item.name}
        </NavLink>
      </CTableDataCell>
      <CTableDataCell>{item.url}</CTableDataCell>
      <CTableDataCell>{item.httpMethod}</CTableDataCell>

      <CTableDataCell>
        <NavLink to={"/webservice-status/"+ item.id} name="webservice Status">
          <CButton color="info" variant="outline" shape="rounded-pill">
          <CIcon icon={cilTask} />
         
          </CButton>
        </NavLink>
      </CTableDataCell>
    </CTableRow>
  );
}

export default WebService;
