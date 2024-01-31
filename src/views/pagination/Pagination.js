import React from "react";

import {
  CRow,
  CCol,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from "@coreui/react";

function Pagination({
  selectedPage,
  setSelectedPage,
  objects,
  noOfRows,
  setNoOfRows,
}) {
    
  let pagination;

  let noPages = Math.ceil(objects.length / noOfRows);

  if (objects.length > noOfRows && noPages >= 1) {
    let preDisabled = selectedPage == 1;
    let nxtDisabled = selectedPage == noPages;
    let prev = (
      <CPaginationItem
        disabled={preDisabled}
        onClick={() => setSelectedPage(selectedPage - 1)}
      >
        Previous
      </CPaginationItem>
    );
    let item = [];
    for (let i = 1; i <= noPages; i++) {
      if (i == selectedPage) {
        item.push(
          <CPaginationItem active onClick={() => setSelectedPage(i)}>
            {i}
          </CPaginationItem>
        );
      } else {
        item.push(
          <CPaginationItem onClick={() => setSelectedPage(i)}>
            {i}
          </CPaginationItem>
        );
      }
    }
    let next = (
      <CPaginationItem
        disabled={nxtDisabled}
        onClick={() => setSelectedPage(selectedPage + 1)}
      >
        Next
      </CPaginationItem>
    );
    pagination = (
      <CPagination aria-label="Page navigation example">
        {prev}
        {item}
        {next}
      </CPagination>
    );
  } else {
    pagination = <></>;
  }

  return (
    <>
      {noPages <= 0 ? (
        <></>
      ) : (
        <CRow>
          <CCol xs={4}></CCol>
          <CCol xs={4}></CCol>
          <CCol xs={4} className="align-item-end">
            <CRow>
              <CCol xs={8}> {pagination}</CCol>
              <CCol xs={4}>
                <CFormSelect
                  value={noOfRows}
                  onChange={(e) => {
                    setNoOfRows(e.target.value);
                    setSelectedPage(1);
                  }}
                >
                  <option>4</option>
                  <option>8</option>
                  <option>12</option>
                  <option>16</option>
                  <option>20</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      )}
    </>
  );
}

export default Pagination;
