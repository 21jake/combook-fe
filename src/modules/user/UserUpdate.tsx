import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, selectEntityById } from './user.reducer';
import { CButton, CCardBody, CInvalidFeedback } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import {
  CCard,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Formik } from 'formik';
import { getEntity, createEntity, updateEntity } from './user.api';
import { getEntities as getClasses } from '../class/class.api';
import { getEntities as getSubjects } from '../subject/subject.api';
import { resetEntity } from './user.reducer';
import * as Yup from 'yup';
import { IClass } from '../../shared/models/class.model';
import CustomSelect from '../../shared/components/CustomSelect';
import { INewUser } from '../../shared/models/user.model';
import { mapRole, Role, roleArray } from '../../shared/enum/role';
import { subjectSelectors } from '../subject/subject.reducer';
import { classSelectors } from '../class/class.reducer';
import { ISubject } from '../../shared/models/subject.model';
import { DEFAULT_PASSWORD } from '../../config/constants';

interface IUserUpdateParams {
  [x: string]: string;
}
interface IUserUpdate extends RouteComponentProps<IUserUpdateParams> {}

const UserUpdate = ({ match, history }: IUserUpdate) => {
  const dispatch = useDispatch();

  const { _id } = match.params;

  const newClassEntity: INewUser = {
    name: '',
    email: '',
    _class: undefined,
    subject: undefined,
    role: Role.STUDENT,
    password: DEFAULT_PASSWORD,
    passwordConfirm: DEFAULT_PASSWORD,
  };

  const subjects = useSelector(subjectSelectors.selectAll);
  const classes = useSelector(classSelectors.selectAll);

  const userEntity = useSelector(selectEntityById(_id));

  const { initialState } = useSelector((state: RootState) => state.user);
  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const handleGoBack = () => {
    history.goBack();
  };

  // HANDLE WHEN USER REFRESH (NO ENTITY, ID AVAILABLE)
  useEffect(() => {
    if (_id) {
      dispatch(getEntity(_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);



  useEffect(() => {
    if (updateEntitySuccess) {
      window.scrollTo(0, 0);
      ToastSuccess(`${_id ? 'C???p nh???t' : 'T???o m???i'} Ng?????i d??ng th??nh c??ng`);
      handleGoBack();
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEntitySuccess]);

  useEffect(() => {
    dispatch(getClasses({ limit: 50, page: 0 }));
    dispatch(getSubjects({ limit: 50, page: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'T??n kh??ng h???p l???!')
      .max(50, 'T??n kh??ng h???p l???!')
      .matches(/^[a-eghik-vxy??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????A-EGHIK-VXY??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/, 'T??n kh??ng h???p l???')
      .required('Vui l??ng nh???p t??n'),
    email: Yup.string().email('?????nh d???ng email kh??ng ch??nh x??c').required('Vui l??ng nh???p email'),
    role: Yup.string().required('Vui l??ng ch???n vai tr??'),
    subject: Yup.object().when('role', {
      is: Role.TEACHER,
      then: Yup.object()
        .shape({})
        .nullable()
        .required('Gi??o vi??n ph???i ???????c g??n v???i m???t b??? m??n gi???ng d???y'),
    }),
    _class: Yup.object().when('role', {
      is: Role.STUDENT,
      then: Yup.object().shape({}).nullable().required('H???c sinh ph???i ???????c g??n v???i m???t l???p'),
    }),
  });

  const handleRawVal = (rawVal: INewUser) => {
    let clone = { ...rawVal };
    if (clone.subject && typeof clone.subject !== 'string') {
      clone.subject = clone.subject._id;
    } else {
      clone.subject = undefined;
    }
    if (clone._class && typeof clone._class !== 'string') {
      clone._class = clone._class.id;
    } else {
      clone._class = undefined
    }
    return clone
    
  };

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <p className={`lead bold-600 m-0`}> {_id ? 'C???p nh???t ' : 'T???o m???i '} Ng?????i d??ng </p>
          </CCardHeader>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={userEntity || newClassEntity}
            onSubmit={(rawValues) => {
              const value = handleRawVal(rawValues);
              console.log(value, 'value');
                dispatch(fetching());
                if (_id) {
                  dispatch(updateEntity(value));
                } else {
                  dispatch(createEntity(value));
                }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => (
              <>

                <CForm className="form-horizontal" onSubmit={handleSubmit}>
                  <CCardBody>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="name">
                          T??n ng?????i d??ng
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          onChange={handleChange}
                          id="name"
                          name="name"
                          value={values.name}
                          invalid={!!errors.name && touched.name}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.name}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="email">
                          Email
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          onChange={handleChange}
                          id="email"
                          name="email"
                          value={values.email}
                          invalid={!!errors.email && touched.email}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.email}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="role">
                          Vai tr??
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CustomSelect
                          onBlur={() => setFieldTouched('role')}
                          onChange={(role: { value: Role }) => {
                            setFieldValue('role', role?.value);
                            setFieldValue('subject', '');
                            setFieldValue('_class', '');
                          }}
                          value={{
                            label: mapRole[values.role],
                            value: values.role,
                          }}
                          options={roleArray.map((e: Role) => ({
                            label: mapRole[e],
                            value: e,
                          }))}
                          defaultValue={null}
                          isMulti={false}
                          isDisabled={!!_id}
                        />
                        <CInvalidFeedback
                          className={!!errors.role && touched.role ? 'd-block' : 'd-none'}
                        >
                          {errors.role}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    {values.role === Role.TEACHER ? (
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel className="bold-600" htmlFor="subject">
                            M??n h???c
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CustomSelect
                            onBlur={() => setFieldTouched('subject')}
                            onChange={(subject: ISubject) => setFieldValue('subject', subject)}
                            value={
                              typeof values.subject !== 'string'
                                ? {
                                    ...values.subject,
                                    label: values.subject?.name,
                                    value: values.subject?._id,
                                  }
                                : null
                            }
                            options={subjects.map(({ name, _id }) => ({
                              label: name,
                              value: _id,
                              _id,
                              name,
                            }))}
                            defaultValue={null}
                            isMulti={false}
                            isDisabled={false}
                          />
                          <CInvalidFeedback
                            className={!!errors.subject && touched.subject ? 'd-block' : 'd-none'}
                          >
                            {errors.subject}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    ) : (
                      ''
                    )}

                    {values.role === Role.STUDENT ? (
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel className="bold-600" htmlFor="_class">
                            L???p h???c
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CustomSelect
                            onBlur={() => setFieldTouched('_class')}
                            onChange={(_class: IClass) => setFieldValue('_class', _class)}
                            value={
                              typeof values._class !== 'string'
                                ? {
                                    ...values._class,
                                    label: values._class?.name,
                                    value: values._class?.id,
                                  }
                                : null
                            }
                            options={classes.map(({ name, id }) => ({
                              label: name,
                              value: id,
                              id,
                              name,
                            }))}
                            defaultValue={null}
                            isMulti={false}
                            isDisabled={false}
                          />
                          <CInvalidFeedback
                            className={!!errors._class && touched._class ? 'd-block' : 'd-none'}
                          >
                            {errors._class}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    ) : (
                      ''
                    )}
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary" disabled={loading}>
                      <CIcon name="cil-scrubber" /> X??c nh???n
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-3" onClick={handleGoBack} disabled={loading}>
                      <CIcon name="cil-arrow-left" /> Quay l???i
                    </CButton>
                  </CCardFooter>
                </CForm>
              </>
            )}
          </Formik>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserUpdate;
