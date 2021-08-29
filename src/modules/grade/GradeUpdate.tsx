import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, selectEntityById } from './grade.reducer';
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
} from './grade.api';
import { resetEntity } from './grade.reducer';
import { INewGrade } from '../../shared/models/grade.model';
import * as Yup from 'yup';

interface IGradeUpdateParams {
  [x: string]: string;
}
interface IGradeUpdate extends RouteComponentProps<IGradeUpdateParams> {}

const GradeUpdate = ({ match, history }: IGradeUpdate) => {
  const dispatch = useDispatch();

  const { _id } = match.params;

  const newGradeEntity: INewGrade = {
    name: '',
  };

  const gradeEntity = useSelector(selectEntityById(_id));

  const { initialState } = useSelector((state: RootState) => state.grade);
  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const handleGoBack = () => {
    history.goBack();
  };

  // HANDLE WHEN USER REFRESH (NO ENTITY, ID AVAILABLE)
  useEffect(() => {
    if (!gradeEntity && _id) {
      dispatch(getEntity(_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeEntity, _id]);

  // HANDLE WHEN USER NAVIGATE (RUN ONCE, ONLY WHEN ENTITY AVAILABLE)
  // useEffect(() => {
  //   if (gradeEntity) {
  //     dispatch(getEntityModels(Number(id)));
  //   }
  // }, []);

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
    name: Yup.string()
      .min(1, 'Tên không hợp lệ!')
      .max(50, 'Tên không hợp lệ!')
      .required('Vui lòng nhập tên'),
  });

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <p className={`lead bold-600 m-0`}>{_id ? 'Cập nhật ' : 'Tạo mới '} Khối</p>
          </CCardHeader>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={gradeEntity || newGradeEntity}
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
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <>
                {/* {JSON.stringify(errors)} */}
                <CForm className="form-horizontal" onSubmit={handleSubmit}>
                  <CCardBody>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel className="bold-600" htmlFor="name">
                          Tên khối
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9" className="p-0">
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

export default GradeUpdate;
