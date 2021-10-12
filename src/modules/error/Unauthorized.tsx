import { CCol, CContainer, CRow } from "@coreui/react";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">403</h1>
              <h4 className="pt-3">KHÔNG ĐỦ THẨM QUYỀN.</h4>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ErrorPage;
