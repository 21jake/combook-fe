import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, selectEntityById } from './class.reducer';
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
import { getEntity, createEntity, updateEntity } from './class.api';
import { getEntities } from '../grade/grade.api';
import { gradeSelectors } from '../grade/grade.reducer';
import { resetEntity } from './class.reducer';
import * as Yup from 'yup';
import { INewClass } from '../../shared/models/class.model';
import CustomSelect from '../../shared/components/CustomSelect';
import { IGrade } from '../../shared/models/grade.model';

interface IClassUpdateParams {
  [x: string]: string;
}
interface IClassUpdate extends RouteComponentProps<IClassUpdateParams> {}

const ClassUpdate = ({ match, history }: IClassUpdate) => {
  const dispatch = useDispatch();

  const { id } = match.params;

  const newClassEntity: INewClass = {
    name: '',
    grade: undefined,
  };

  const grades = useSelector(gradeSelectors.selectAll);
  const classEntity = useSelector(selectEntityById(id));

  const { initialState } = useSelector((state: RootState) => state.class);
  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const handleGoBack = () => {
    history.goBack();
  };

  // HANDLE WHEN USER REFRESH (NO ENTITY, ID AVAILABLE)
  useEffect(() => {
    if (id) {
      dispatch(getEntity(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      ToastSuccess(`${id ? 'C???p nh???t' : 'T???o m???i'} L???p th??nh c??ng`);
      handleGoBack();
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEntitySuccess]);

  useEffect(() => {
    dispatch(getEntities({ limit: 50, page: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'T??n kh??ng h???p l???!')
      .max(50, 'T??n kh??ng h???p l???!')
      .required('Vui l??ng nh???p t??n'),
    grade: Yup.object().shape({}).nullable().required('Vui l??ng ch???n kh???i'),
  });


  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <p className={`lead bold-600 m-0`}> {id ? 'C???p nh???t ' : 'T???o m???i '} L???p</p>
          </CCardHeader>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={classEntity || newClassEntity}
            onSubmit={(rawValues) => {
              dispatch(fetching());
              if (id) {
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
                          T??n l???p
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
                        <CLabel className="bold-600" htmlFor="grade">
                          Kh???i
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
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary" disabled={loading}>
                      <CIcon name="cil-scrubber" /> X??c nh???n
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-3" onClick={handleGoBack}>
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

export default ClassUpdate;
