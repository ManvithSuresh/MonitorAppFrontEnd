import React from "react";


import {
    CTableDataCell,
    CTableHeaderCell,
    CTableRow
  } from "@coreui/react";

import { NavLink } from "react-router-dom";

function User(props) {

  const handleOnClickUser = (user) => {
    navigate("/user-detail", user);
  };  

  const item = props.item  

  return (
    <CTableRow key={item.id}>
      <CTableHeaderCell scope="row">{(props.index + 1)}</CTableHeaderCell>
      <CTableDataCell onClick={(item) => handleOnClickUser}>
        <NavLink to={"/user-detail/" + item.id} name="Update User">
          {item.name}
        </NavLink>
      </CTableDataCell>
      <CTableDataCell>{item.type}</CTableDataCell>
      <CTableDataCell>{item.email}</CTableDataCell>
      <CTableDataCell>{item.phoneNumber}</CTableDataCell>
    </CTableRow>
  );
}

export default User;
