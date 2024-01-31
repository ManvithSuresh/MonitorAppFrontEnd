import React, { useState } from "react";

import { CCol, CFormInput, CFormFeedback, CFormTextarea, CButton, CRow } from "@coreui/react";
import { cilPlus, cilMinus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function WSRequestData({
  id,
  requestData,
  isLastIndex,
  addRequestData,
  setRequestData,
  removeRequestData,
}) {
  const [name, setName] = useState(requestData.name);
  const [description, setDescription] = useState(requestData.description);
  const [value, setValue] = useState(requestData.value);

  const setParamName = (e) => {
    setName(e.target.value);
    setRequestData(id, e.target.value, value, description);
  };

  const setParamValue = (e) => {
    setValue(e.target.value);
    setRequestData(id, name, e.target.value, description);
  };

  const setParamDescription = (e) => {
    setDescription(e.target.value);
    setRequestData(id, name, value, e.target.value);
  };

  const remove = () => {
    removeRequestData(id);
  };

  const designAddRemoveButton = {
    textAlign: 'center',
    verticalAlign: 'middle',
    writingMode: 'vertical-rl'
}

  return (
    <>
      <CCol xs={3} className="p-1">
        <CFormInput
          type="text"
          placeholder="Name"
          required
          value={name}
          disabled={!requestData.isNewlyAdded}
          onChange={setParamName}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      {/* <CCol xs={1} className="p-1"></CCol> */}
      <CCol xs={3} className="p-1">
        <CFormInput
          type="text"
          required
          value={value}
          placeholder="Value"
          onChange={setParamValue}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={5} className="p-1">
        <CFormTextarea
          id="exampleFormControlTextarea1"
          value={description}
          placeholder="Description"
          onChange={setParamDescription}
          rows={2}
        ></CFormTextarea>
      </CCol>
      <CCol xs={1} className="p-1 justify-content-center" style={designAddRemoveButton}>
        <CRow className="justify-content-center">
          <CCol xs={12}>
            {isLastIndex ? (
              <CButton
                color="primary"
                variant="outline"
                shape="rounded-pill"
                onClick={addRequestData}
              >
                <CIcon icon={cilPlus} />
              </CButton>
            ) : (
              <CButton
                color="secondary"
                variant="outline"
                shape="rounded-pill"
                onClick={remove}
              >
                <CIcon icon={cilMinus} />
              </CButton>
            )}
          </CCol>
        </CRow>
      </CCol>
    </>
  );
}

export default WSRequestData;
