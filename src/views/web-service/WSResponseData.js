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

function WSResponseData({id, responseData, isLastIndex, addResponseData, setResponseData, removeResponseData }) {
    
  const [name, setName] = useState(responseData.name);
  const [value, setValue] = useState(responseData.value);

  const setParamName = (e) => {
    setName(e.target.value)
    setResponseData(id, e.target.value, value)
  }

  const setParamValue = (e) => {
    setValue(e.target.value)
    setResponseData(id, name, e.target.value)
  }

  const remove = () => {
    removeResponseData(id)
  }

  return (
    <>
      <CCol xs={5} className="p-1">
        <CFormInput
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={setParamName}
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
              isLastIndex ? <CButton color="primary" variant="outline" shape="rounded-pill" onClick={addResponseData}>
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

export default WSResponseData;
