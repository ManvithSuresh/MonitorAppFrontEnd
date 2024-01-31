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

function Server(props) {
  const navigate = useNavigate();

  const handleOnClickUser = (server) => {
    navigate("/server-detail", server);
  };

  const item = props.item;

  return (
    <CTableRow key={item.id}>
      <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
      <CTableDataCell onClick={(item) => handleOnClickUser}>
        <NavLink to={"/server-detail/" + item.id} name="update server">
          {item.name}
        </NavLink>
      </CTableDataCell>
      <CTableDataCell>{item.host}</CTableDataCell>
      {/* <CTableDataCell>{item.port}</CTableDataCell> */}
      <CTableDataCell onClick={(item) => handleOnClickUser}>
        <NavLink to={"/server-status/" + item.id} name="Server Status">
          <CButton color="info" variant="outline" shape="rounded-pill">
            <CIcon icon={cilTask} />
          </CButton>
        </NavLink>
      </CTableDataCell>
    </CTableRow>
  );
}

export default Server;
