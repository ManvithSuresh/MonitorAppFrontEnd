import React, { useState } from "react";

import { CCol, CFormInput, CFormFeedback, CFormSelect } from "@coreui/react";

function WebServiceResponseData({
  id,
  responseData,
  isLastIndex,
  addResponseData,
  setResponseDataParent,
  removeResponseData,
}) {
  const [name, setName] = useState(responseData.name);
  const [values, setValues] = useState(
    responseData.values ? responseData.values : []
  );
  const [valueIndex, setValueIndex] = useState(0);

  const setDataName = (e) => {
    setName(e.target.value);
    setResponseDataParent(id, e.target.value, values);
  };

  const setDataValue = (e) => {
    setValues(e.target.value);
    setResponseDataParent(id, name, e.target.value);
  };

  const remove = () => {
    removeResponseData(id);
  };

  return (
    <>
      <CCol xs={5} className="p-1">
        <CFormInput
          type="text"
          placeholder="Name"
          required
          value={name}
          disabled
          onChange={setDataName}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol xs={2} className="p-1">
        {values.length > 1 ? (
          <>
            <CFormSelect
              id="validationCustom05"
              value={valueIndex}
              onChange={(e) => {
                setValueIndex(e.target.value);
              }}
            >
              {values.map((v, i) => (
                <option key={i}>{i}</option>
              ))}
            </CFormSelect>
            <CFormFeedback invalid>
              Please provide a valid Value Index.
            </CFormFeedback>
          </>
        ) : (
          <></>
        )}
      </CCol>
      <CCol xs={5} className="p-1">
        <CFormInput
          type="text"
          required
          value={values[valueIndex]}
          placeholder="Value"
          disabled
          onChange={setDataValue}
        />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
    </>
  );
}
export default WebServiceResponseData;
