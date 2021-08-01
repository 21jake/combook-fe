import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import IIdentificationModal from "./IdentificationModal";

const Identification = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CContainer fluid>
        <CCard className="c-email-app">
          <CCardHeader>User Identification</CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between">
              <CCol xs={4}>
                <h6>Personal Information</h6>
                <h6>Review time: 1 day</h6>
              </CCol>
              <CCol xs={4}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                  <CButton color="dark" onClick={() => setVisible(true)}>
                    Verify Now
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <IIdentificationModal visible={visible} setVisible={setVisible} />
      </CContainer>
    </>
  );
};

export default Identification;
