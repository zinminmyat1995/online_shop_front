import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea
} from '@coreui/react'
const SuccessError = (props) => {
  return (
    <>
      {
        // to show error message
        props.error?.length > 0 && (
        <CRow className="error">
           {Array.from(new Set(props.error)).map((data, index) => {
            return (
              <label key={index} className="success-error-label">{data}</label>
            );
          })}
        </CRow>
        )
      }
      {
        // to show success message
        props.success?.length > 0 && (
          <CRow className="success">
              {Array.from(new Set(props.success)).map((data, index) => {
                return (
                  <label key={index}  className="success-error-label">{data}</label>
                );
              })}
          </CRow>
        )
      }
    </>
  );
};
export default SuccessError;
