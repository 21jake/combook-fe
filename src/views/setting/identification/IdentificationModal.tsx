import {
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Formik } from "formik";
import React from "react";
import { ToastSuccess } from "../../../shared/components/Toast";
interface IIdentificationModal {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

interface IFormValues {
  nationalId: string;
  name: string;
}

type IProps = IIdentificationModal;

const IIdentificationModal = (props: IProps) => {
  const { visible, setVisible } = props;
  const initialValues: IFormValues = { nationalId: "", name: "" };
  return (
    <>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Verification Form</CModalTitle>
        </CModalHeader>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: any = {};
            if (!values.nationalId) {
              errors.nationalId = "Vui lòng nhập id";
            } else if (!values.name) {
              errors.name = "Vui lòng nhập tên";
            }
            // else if (!values.dateOfBirth) {
            //   errors.dateOfBirth = "Vui lòng chọn ngày sinh";
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // dispatch(fetching());
            ToastSuccess("Thông tin cá nhân đã được tiếp nhận !");
            setVisible(false);
            // dispatch(login(values))
            // setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <CForm onSubmit={handleSubmit}>
                <CModalBody>
                  <p className="text-muted">Identity Information</p>
                  <CFormGroup>
                    <CLabel htmlFor="nationalId">CMND</CLabel>
                    <CInput
                      onChange={handleChange}
                      id="nationalId"
                      name="nationalId"
                      value={values.nationalId}
                      invalid={!!(errors.nationalId && touched.nationalId && errors.nationalId)}
                    />
                    <CInvalidFeedback>{errors.nationalId && touched.nationalId && errors.nationalId}</CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Họ và Tên</CLabel>
                    <CInput
                      onChange={handleChange}
                      id="name"
                      name="name"
                      value={values.name}
                      invalid={!!(errors.name && touched.name && errors.name)}
                    />
                    <CInvalidFeedback>{errors.name && touched.name && errors.name}</CInvalidFeedback>
                  </CFormGroup>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" type="submit">
                    Submit
                  </CButton>
                </CModalFooter>
              </CForm>
            </>
          )}
        </Formik>
      </CModal>
    </>
  );
};

export default IIdentificationModal;
