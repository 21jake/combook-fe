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
import { fetching, toggleIsFirstTime } from './auth.reducer';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { toggleSidebar } from '../../containers/reducer';
import { login, verify } from './auth.api';
import { ToastError } from '../../shared/components/Toast';
import { RootState } from '../../shared/reducers';
import { getCookie, setCookie } from '../../shared/helpers';
import { RouteComponentProps } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

interface ILogin extends RouteComponentProps {}

const Login = ({ location }: ILogin) => {
  const { pathname, search } = location;

  useEffect(() => {
    // Handle if this is the first time user enters the system
    if (pathname === '/init' && search.length) {
      const jwt = search.substring(1);
      setCookie('jwt', jwt, 7);
      dispatch(toggleIsFirstTime());
      dispatch(fetching());
      dispatch(verify());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const initialValues: FormValues = { email: '', password: '' };
  return (
    <>
      <CModal closeOnBackdrop={false} show={true}>
        <CModalHeader>
          <CModalTitle>Ch??o m???ng b???n ?????n v???i h??? th???ng!</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = 'Vui l??ng nh???p email';
                } else if (!values.password) {
                  errors.password = 'Vui l??ng nh???p m???t kh???u';
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
                  <h1>????ng nh???p</h1>
                  <p className="text-muted">Vui l??ng nh???p t??i kho???n v?? m???t kh???u</p>
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
                      placeholder="T??n ????ng nh???p"
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
                      placeholder="M???t kh???u"
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
                        X??c nh???n
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
