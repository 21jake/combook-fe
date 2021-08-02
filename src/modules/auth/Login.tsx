import React, { useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CCardBody,
  CCol,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { fetching } from './auth.reducer';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { toggleSidebar } from '../../containers/reducer';
import { login, verify } from './auth.api';
import { ToastError } from '../../shared/components/Toast';
import { RootState } from '../../shared/reducers';
import { getCookie } from '../../shared/helpers';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const authenticationState = useSelector((state: RootState) => state.authentication);
  const { loading, token, errorMessage } = authenticationState;

  useEffect(() => {
    // Hide sidebar until user successfully logs in
    dispatch(toggleSidebar(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cookie = getCookie('jwt');
    if (token || cookie) {
      dispatch(toggleSidebar('responsive'));
      dispatch(fetching());
      dispatch(verify());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
    }
  }, [errorMessage]);

  const initialValues: FormValues = { email: '', password: '' };
  return (
    <>
      <CModal closeOnBackdrop={false} show={true}>
        <CModalHeader>
          <CModalTitle>Chào mừng bạn đến với hệ thống!</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = 'Vui lòng nhập email';
                } else if (!values.password) {
                  errors.password = 'Vui lòng nhập mật khẩu';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(fetching());
                dispatch(login(values));
                // setSubmitting(false);
              }}
            >
              {({
                isSubmitting,
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <CForm onSubmit={handleSubmit}>
                  <h1>Đăng nhập</h1>
                  <p className="text-muted">Vui lòng nhập tài khoản và mật khẩu</p>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon content={freeSet.cilUser} />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Tên đăng nhập"
                    />
                  </CInputGroup>
                  <p className="text-danger m-1">{errors.email && touched.email && errors.email}</p>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon content={freeSet.cilLockLocked} />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </CInputGroup>
                  <p className="text-danger m-1">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <CRow className="mt-3">
                    <CCol xs="6">
                      <CButton type="submit" disabled={loading} color="info" className="px-4">
                        Xác nhận
                      </CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton color="link" className="px-0">
                        Quên mật khẩu?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              )}
            </Formik>
          </CCardBody>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Login;
