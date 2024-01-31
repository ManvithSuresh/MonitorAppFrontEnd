import React, { useState } from "react";

import {
  CCol,
  CFormInput,
  CFormFeedback,
  CButton,
  CRow,
} from "@coreui/react";
import { cilPlus, cilMinus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function Header({id, header, isLastIndex, addHeader, setHeader, removeHeader }) {
    
  const [key, setKey] = useState(header.key);
  const [value, setValue] = useState(header.value);

  const setParamKey = (e) => {
    setKey(e.target.value)
    setHeader(id, e.target.value, value)
  }

  const setParamValue = (e) => {
    setValue(e.target.value)
    setHeader(id, key, e.target.value)
  }

  const remove = () => {
    removeHeader(id)
  }

  return (
    <>
      <CCol xs={5} className="p-1">
        <CFormInput
          type="text"
          placeholder="Key"
          required
          value={key}
          onChange={setParamKey}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={1} className="p-1"></CCol>
      <CCol xs={5} className="p-1">
        <CFormInput
          type="text"
          required
          value={value}
          placeholder="Value"
          onChange={setParamValue}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={1} className="p-1">
        <CRow>
          <CCol xs={12}>
            {
              isLastIndex ? <CButton color="primary" variant="outline" shape="rounded-pill" onClick={addHeader}>
              <CIcon icon={cilPlus} />
              </CButton> : <CButton color="secondary" variant="outline" shape="rounded-pill" onClick={remove}>
              <CIcon icon={cilMinus} />
            </CButton>
            }            
          </CCol>          
        </CRow>
      </CCol>
    </>
  );
}

export default Header;
