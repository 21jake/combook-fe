import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, selectEntityById } from './tuition.reducer';
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
import {
  getEntity,
  createEntity,
  //  , getEntityModels,
  updateEntity,
} from './tuition.api';
import { resetEntity } from './tuition.reducer';
import { INewTuition } from '../../shared/models/tuition.model';
//import { getEntities } from '../grade/grade.api';
import * as Yup from 'yup';
import CustomSelect from '../../shared/components/CustomSelect';
import { ISemester } from '../../shared/models/semester.model';
import { semesterSelectors } from '../semester/semester.reducer';
import { IUser } from '../../shared/models/user.model';
import { userSelectors } from '../user/user.reducer';

interface ITuitionUpdateParams {
  [x: string]: string;
}
interface ITuitionUpdate extends RouteComponentProps<ITuitionUpdateParams> {}

const TuitionUpdate = ({ match, history }: ITuitionUpdate) => {
  const dispatch = useDispatch();

  const semesters = useSelector(semesterSelectors.selectAll);

  const users = useSelector(userSelectors.selectAll)

  const { _id } = match.params;

  const newTuitionEntity: INewTuition = {
    semester:undefined,
    isPaid:false,
    user:undefined
  };

  const tuitionEntity = useSelector(selectEntityById(_id));

  const { initialState } = useSelector((state: RootState) => state.tuition);
  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const handleGoBack = () => {
    history.goBack();
  };

  // HANDLE WHEN USER REFRESH (NO ENTITY, ID AVAILABLE)
  useEffect(() => {
    if (!tuitionEntity && _id) {
      dispatch(getEntity(_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuitionEntity, _id]);

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
      ToastSuccess(`${_id ? 'Cập nhật' : 'Tạo mới'} khối thành công!`);
      handleGoBack();
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEntitySuccess]);

  const validationSchema = Yup.object().shape({
    semester: Yup.string()
      .min(1, 'Tên không hợp lệ!')
      .max(50, 'Tên không hợp lệ!')
      .required('Vui lòng nhập tên')
      .matches(/^Học Kỳ? [0-6]/gm, 'Tên không hợp lệ!. VD: Học kỳ n(n từ 1 đến 6)')
  });

//   useEffect(() => {
//     dispatch(getEntities({ limit: 50, page: 0 }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <p className={`lead bold-600 m-0`}>{_id ? 'Cập nhật ' : 'Tạo mới '} học kỳ</p>
          </CCardHeader>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={tuitionEntity || newTuitionEntity}
            onSubmit={(rawValues, { setSubmitting }) => {
              setSubmitting(true);
              dispatch(fetching());
              if (_id) {
                dispatch(updateEntity(rawValues));
              } else {
                dispatch(createEntity(rawValues));
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
                {/* {JSON.stringify(errors)} */}
                <CForm className="form-horizontal" onSubmit={handleSubmit}>
                  <CCardBody>
                    
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="grade">
                          Học kỳ
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CustomSelect
                          onBlur={() => setFieldTouched('semester')}
                          onChange={(semester: ISemester) => setFieldValue('semester', semester)}
                          value={{
                            ...values.semester,
                            label: values.semester?.name,
                            value: values.semester?._id,
                          }}
                          options={semesters.map(({ name, _id }) => ({
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
                          className={!!errors.semester && touched.semester ? 'd-block' : 'd-none'}
                        >
                          {errors.semester}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="grade">
                          Tên học sinh
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CustomSelect
                          onBlur={() => setFieldTouched('user')}
                          onChange={(user: IUser) => setFieldValue('user', user)}
                          value={{
                            ...values.user,
                            label: values.user?.name,
                            value: values.user?.id,
                          }}
                          options={users.map(({ name, id }) => ({
                            label: name,
                            value: id,
                            _id,
                            name,
                          }))}
                          defaultValue={null}
                          isMulti={false}
                          isDisabled={false}
                        />
                        <CInvalidFeedback
                          className={!!errors.user && touched.user ? 'd-block' : 'd-none'}
                        >
                          {errors.user}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>


                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary" disabled={loading}>
                      <CIcon name="cil-scrubber" /> Xác nhận
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-3" onClick={handleGoBack}>
                      <CIcon name="cil-arrow-left" /> Quay lại
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

export default TuitionUpdate;
