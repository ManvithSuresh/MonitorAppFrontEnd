import React, { useState } from "react";

import {
  CCol,
  CFormInput,
  CFormFeedback,
  CButton,
  CRow,
  CFormLabel,
} from "@coreui/react";
import { cilPlus, cilMinus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function ExecuteWSRequestData({
  id,
  requestData,
  isLastIndex,
  addRequestData,
  setRequestDataParent,
  removeRequestData,
}) {
  const [name, setName] = useState(requestData.name);
  const [description, setDescription] = useState(requestData.description);
  const [value, setValue] = useState(requestData.value);

  const setDataName = (e) => {
    setName(e.target.value);
    setRequestDataParent(id, e.target.value, value, description);
  };

  const setDataValue = (e) => {
    setValue(e.target.value);
    setRequestDataParent(id, name, e.target.value, description);
  };

  const setDataDescription = (e) => {
    setDescription(e.target.value);
    setRequestDataParent(id, name, value, e.target.value);
  };

  const remove = () => {
    removeRequestData(id);
  };

  return (
    <>
      <CCol xs={3} className="p-1">
        <CFormInput
          type="text"
          placeholder="Name"
          required
          value={name}
          disabled={!requestData.isNewlyAdded}
          onChange={setDataName}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={1} className="p-1"></CCol>
      <CCol xs={7} className="p-1">
        <CFormInput
          type="text"
          required
          value={value}
          placeholder={description}
          onChange={setDataValue}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={1} className="p-1">
        <CRow>
          <CCol xs={12}>
            {requestData.isNewlyAdded && isLastIndex ? (
              <CRow>
                <CCol xs={6}>
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="rounded-pill"
                    onClick={addRequestData}
                  >
                    <CIcon icon={cilPlus} />
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton
                    color="secondary"
                    variant="outline"
                    shape="rounded-pill"
                    onClick={remove}
                  >
                    <CIcon icon={cilMinus} />
                  </CButton>
                </CCol>
              </CRow>
            ) : isLastIndex ? (
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                onClick={addRequestData}
              >
                <CIcon icon={cilPlus} />
              </CButton>
            ) : requestData.isNewlyAdded ? (
              <CButton
                color="secondary"
                variant="outline"
                shape="rounded-pill"
                onClick={remove}
              >
                <CIcon icon={cilMinus} />
              </CButton>
            ) : (
              <></>
            )}
          </CCol>
        </CRow>
      </CCol>
    </>
  );
}
export default ExecuteWSRequestData;
