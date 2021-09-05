import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, selectEntityById } from './semester.reducer';
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
} from './semester.api';
import { resetEntity } from './semester.reducer';
import { INewSemester } from '../../shared/models/semester.model';
import { getEntities } from '../grade/grade.api';
import * as Yup from 'yup';
import CustomSelect from '../../shared/components/CustomSelect';
import { IGrade } from '../../shared/models/grade.model';
import { gradeSelectors } from '../grade/grade.reducer';

interface ISemesterUpdateParams {
  [x: string]: string;
}
interface ISemesterUpdate extends RouteComponentProps<ISemesterUpdateParams> {}

const SemesterUpdate = ({ match, history }: ISemesterUpdate) => {
  const dispatch = useDispatch();

  const grades = useSelector(gradeSelectors.selectAll);

  const { _id } = match.params;

  const newSemesterEntity: INewSemester = {
    name: '',
    fee: 0,
    grade: undefined,
  };

  const semesterEntity = useSelector(selectEntityById(_id));

  const { initialState } = useSelector((state: RootState) => state.semester);
  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const handleGoBack = () => {
    history.goBack();
  };

  // HANDLE WHEN USER REFRESH (NO ENTITY, ID AVAILABLE)
  useEffect(() => {
    if (!semesterEntity && _id) {
      dispatch(getEntity(_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterEntity, _id]);

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
      ToastSuccess(`${_id ? 'Cập nhật' : 'Tạo mới'} học kỳ thành công!`);
      handleGoBack();
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEntitySuccess]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Tên không hợp lệ!')
      .max(50, 'Tên không hợp lệ!')
      .required('Vui lòng nhập tên')
      .matches(/^Học Kỳ? [0-6]/gm, 'Tên không hợp lệ!. VD: Học kỳ n(n từ 1 đến 6)'),
    fee: Yup.number()
      .typeError('Học phí phải là số')
      .positive('Học phí phải là số nguyên dương')
      .required('Vui lòng nhập học phí'),
  });

  useEffect(() => {
    dispatch(getEntities({ limit: 50, page: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            initialValues={semesterEntity || newSemesterEntity}
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
                        <CLabel className="bold-600" htmlFor="name">
                          Tên học kỳ
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9" >
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
                        <CLabel className="bold-600" htmlFor="grade">
                          Khối
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CustomSelect
                          onBlur={() => setFieldTouched('grade')}
                          onChange={(grade: IGrade) => setFieldValue('grade', grade)}
                          value={{
                            ...values.grade,
                            label: values.grade?.name,
                            value: values.grade?._id,
                          }}
                          options={grades.map(({ name, _id }) => ({
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
                          className={!!errors.grade && touched.grade ? 'd-block' : 'd-none'}
                        >
                          {errors.grade}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="name">
                          Học phí
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9" >
                        <CInput
                          onChange={handleChange}
                          id="fee"
                          name="fee"
                          value={values.fee}
                          invalid={!!errors.fee && touched.fee}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.fee}</CInvalidFeedback>
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

export default SemesterUpdate;
