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

function Parameter({id, parameter, isLastIndex, addParameter, setParameter, removeParameter }) {
  const [key, setKey] = useState(parameter.key);
  const [value, setValue] = useState(parameter.value);

  const setParamKey = (e) => {
    setKey(e.target.value)
    setParameter(id, e.target.value, value)
  }

  const setParamValue = (e) => {
    setValue(e.target.value)
    setParameter(id, key, e.target.value)
  }

  const remove = () => {
    removeParameter(id)
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
              isLastIndex ? <CButton color="primary" variant="outline" shape="rounded-pill" onClick={addParameter}>
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

export default Parameter;
