import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Role } from '../../shared/enum/role';
import { RootState } from '../../shared/reducers';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CIcon from '@coreui/icons-react';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { updatePassword } from '../auth/auth.api';
import { fetching, softReset, toggleIsFirstTime } from '../auth/auth.reducer';
import { DEFAULT_PASSWORD } from '../../config/constants';
import { IAuth } from '../../shared/models/auth.model';

interface IUserDetailProps extends RouteComponentProps {}

export interface IUpdatePasswordBody {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(5, 'Mật khẩu không hợp lệ!')
    .max(50, 'Mật khẩu không hợp lệ!')
    .required('Vui lòng nhập Mật khẩu hiện tại'),
  password: Yup.string()
    .min(5, 'Mật khẩu mới không hợp lệ!')
    .max(50, 'Mật khẩu mới không hợp lệ!')
    .required('Vui lòng nhập Mật khẩu mới'),
  passwordConfirm: Yup.string()
    .min(5, 'Mật khẩu không hợp lệ!')
    .max(50, 'Mật khẩu không hợp lệ!')
    .required('Vui lòng nhập Mật khẩu')
    .test('passwords-match', 'Mật khẩu không khớp', function (value) {
      return this.parent.password === value;
    }),
});

const UserDetail = ({ history }: IUserDetailProps) => {
  const dispatch = useDispatch();
  const { user, loading, errorMessage, updatePasswordSuccess, isFirstTime } = useSelector(
    (state: RootState) => state.authentication
  );

  const initialPasswordValues: IUpdatePasswordBody = {
    currentPassword: isFirstTime ? DEFAULT_PASSWORD : '',
    password: '',
    passwordConfirm: '',
  };

  const redirectBackUserByType = (user: IAuth | null) => {
    if (!user) return;
    switch (user.role) {
      case Role.ADMIN:
        history.push('/users');
        break;
      case Role.TEACHER:
        history.push('/results');
        break;
      case Role.STUDENT:
        history.push('/academic');
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (updatePasswordSuccess) {
      ToastSuccess('Cập nhật mật khẩu thành công');
      if (isFirstTime) {
        dispatch(toggleIsFirstTime());
      }
      dispatch(softReset());
      redirectBackUserByType(user);      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePasswordSuccess]);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
      dispatch(softReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <CCard>
      <CCardHeader>Thông tin người dùng</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs={8}>
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={initialPasswordValues}
              onSubmit={(rawValues, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(fetching());
                dispatch(updatePassword(rawValues));
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <>
                  {/* {JSON.stringify(errors)} */}
                  <CForm className="form-horizontal" onSubmit={handleSubmit}>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="font-weight-bold">Tên người dùng</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={user?.name || ''} readOnly />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="font-weight-bold">Email</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={user?.email || ''} readOnly />
                      </CCol>
                    </CFormGroup>
                    {user?.role === Role.STUDENT ? (
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel className="font-weight-bold">Lớp</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          {typeof user._class !== 'string' ? (
                            <CInput value={user._class?.name || ''} readOnly />
                          ) : (
                            ''
                          )}
                        </CCol>
                      </CFormGroup>
                    ) : (
                      ''
                    )}
                    {user?.role === Role.TEACHER ? (
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel className="font-weight-bold">Bộ môn</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput value={user.subject?.name || ''} readOnly />
                        </CCol>
                      </CFormGroup>
                    ) : (
                      ''
                    )}
                    {!isFirstTime ? (
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel className="font-weight-bold" htmlFor="currentPassword">
                            Mật khẩu hiện tại
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onChange={handleChange}
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={values.currentPassword}
                            invalid={!!errors.currentPassword && touched.currentPassword}
                            onBlur={handleBlur}
                          />
                          <CInvalidFeedback>{errors.currentPassword}</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    ) : (
                      ''
                    )}

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="font-weight-bold" htmlFor="password">
                          Mật khẩu mới
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          onChange={handleChange}
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          invalid={!!errors.password && touched.password}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="font-weight-bold" htmlFor="passwordConfirm">
                          Xác nhận mật khẩu
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          onChange={handleChange}
                          type="password"
                          id="passwordConfirm"
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          invalid={!!errors.passwordConfirm && touched.passwordConfirm}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.passwordConfirm}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CRow>
                      <CCol md="3"></CCol>
                      <CCol xs="12" md="9">
                        <CButton type="submit" size="sm" color="primary" disabled={loading}>
                          <CIcon name="cil-scrubber" /> Xác nhận
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </>
              )}
            </Formik>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default UserDetail;
