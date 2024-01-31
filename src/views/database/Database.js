

import React from "react";
import { CTableDataCell, CTableRow, CButton } from "@coreui/react";
import {  NavLink, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilTask } from "@coreui/icons";

function Database(props) {
  const navigate = useNavigate();
  const item = props.item;

  const handleOnClickDatabase = (databse) => {
    navigate("/database-detail",databse);
  };

  return (
    <CTableRow key={item.id}>
      <CTableDataCell>{item.id}</CTableDataCell>
      <CTableDataCell onClick={(item) => handleOnClickDatabase}>
   
        <NavLink to={"/database-detail/" + item.id} name="update database" >
          {item.name}
        </NavLink>
      </CTableDataCell>
      <CTableDataCell>{item.host}:{item.port}</CTableDataCell>
     
      
      <CTableDataCell>
        <NavLink to={"/database-status/"+ item.id} name="Database Status">
          <CButton color="info" variant="outline" shape="rounded-pill">
          <CIcon icon={cilTask} />
         
          </CButton>
        </NavLink>
      </CTableDataCell>
    </CTableRow>
  );
}

export default Database;

