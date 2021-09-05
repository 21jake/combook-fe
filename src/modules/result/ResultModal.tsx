import CIcon from '@coreui/icons-react';
import {
    CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CCollapse, CDataTable, CForm,
    CFormGroup, CFormText, CInput, CInvalidFeedback,
    CLabel, CModal, CModalBody, CModalHeader,
    CModalTitle, CRow, CTooltip
} from '@coreui/react';
import { faCheckCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomSelect from '../../shared/components/CustomSelect';
import { ToastSuccess } from '../../shared/components/Toast';
import { Role } from '../../shared/enum/role';
import { IParams } from '../../shared/enum/shared-interfaces';
import { IClass } from '../../shared/models/class.model';
import { IResult } from '../../shared/models/result.model';
import { ISubject } from '../../shared/models/subject.model';
import { RootState } from '../../shared/reducers';
import { getEntities as getClasses } from '../class/class.api';
import { classSelectors } from '../class/class.reducer';
import { getEntities as getSubjects } from '../subject/subject.api';
import { subjectSelectors } from '../subject/subject.reducer';
import { getEntities, updateEntity } from './result.api';
import { resetEntity, resultWithinGrade } from './result.reducer';



const teacherFields = [
  { key: 'index', _style: { width: '5%' }, label: 'STT' },
  { key: 'student', _style: { width: '20%' }, label: 'Tên học sinh' },
  { key: 'score_type_1', _style: { width: '15%' }, label: 'Điểm miệng' },
  { key: 'score_type_2', _style: { width: '15%' }, label: 'Điểm 15 phút' },
  { key: 'score_type_3', _style: { width: '15%' }, label: 'Điểm 45 phút' },
  { key: 'score_type_4', _style: { width: '15%' }, label: 'Điểm học kỳ' },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
  },
];

const adminFields = [
  { key: 'index', _style: { width: '5%' }, label: 'STT' },
  { key: 'subject', _style: { width: '15%' }, label: 'Môn học' },
  { key: 'student', _style: { width: '15%' }, label: 'Tên học sinh' },
  { key: 'score_type_1', _style: { width: '15%' }, label: 'Điểm miệng' },
  { key: 'score_type_2', _style: { width: '15%' }, label: 'Điểm 15 phút' },
  { key: 'score_type_3', _style: { width: '15%' }, label: 'Điểm 45 phút' },
  { key: 'score_type_4', _style: { width: '15%' }, label: 'Điểm học kỳ' },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
  },
];

export interface IResultParams extends IParams {
  semester: string;
  student?: string;
  subject?: string | undefined;
}

const validationSchema = Yup.object().shape({
  score_type_1: Yup.number()
    .nullable()
    .typeError('Điểm phải là số')
    .min(0, 'Điểm thấp nhất là 0')
    .max(10, 'Điểm cao nhất là 10'),
  score_type_2: Yup.number()
    .nullable()
    .typeError('Điểm phải là số')
    .min(0, 'Điểm thấp nhất là 0')
    .max(10, 'Điểm cao nhất là 10'),
  score_type_3: Yup.number()
    .nullable()
    .typeError('Điểm phải là số')
    .min(0, 'Điểm thấp nhất là 0')
    .max(10, 'Điểm cao nhất là 10'),
  score_type_4: Yup.number()
    .nullable()
    .typeError('Điểm phải là số')
    .min(0, 'Điểm thấp nhất là 0')
    .max(10, 'Điểm cao nhất là 10'),
});

interface IModalProps {
    isVisible: boolean;
    onAbort: () => void;
    semester: string | undefined;
    grade: string | undefined;
  }
  
const ResultModal = ({ isVisible, onAbort, semester, grade }: IModalProps) => {
  const authenticationState = useSelector((state: RootState) => state.authentication);

  const { initialState } = useSelector((state: RootState) => state.result);

  const { loading, updateEntitySuccess, errorMessage } = initialState;

  const gradeResults = useSelector(resultWithinGrade(grade));
  const classes = useSelector(classSelectors.selectAll).filter((e) => e.grade?._id === grade);
  const subjects = useSelector(subjectSelectors.selectAll);

  const { user } = authenticationState;
  const dispatch = useDispatch();

  const isAdminView = user?.role === Role.ADMIN;

  const [details, setDetails] = useState<string[]>([]);
  const [chosenClass, setClass] = useState<IClass | null>(null);
  const [chosenSubject, setChosenSubject] = useState<ISubject | undefined>(user?.subject);



  const toggleDetails = (index: string) => (): void => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  useEffect(() => {
    if (semester && isVisible) {
      const resultBody: IResultParams = {
        semester,
        subject: chosenSubject?._id,
        limit: 200,
        page: 0,
      };
      dispatch(getEntities(resultBody));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, semester, chosenSubject]);

  useEffect(() => {
    dispatch(getClasses({ page: 0, limit: 20 }));
    dispatch(getSubjects({ page: 0, limit: 20 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateEntitySuccess) {
      ToastSuccess('Cập nhật điểm thành công');
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEntitySuccess]);

  useEffect(() => {
    if (errorMessage) {
      ToastSuccess(errorMessage);
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  

  const classResult = (function () {
    return gradeResults.filter((e) => {
      if (typeof e.student._class === 'string') return false;
      return e.student._class?.id === chosenClass?.id;
    });
  })();

  const onModalClosed = () => {
    onAbort();
    setClass(null);
  };

  return (
    <CModal show={isVisible} color="primary" onClose={onModalClosed} size={'xl'}>
      <CModalHeader>
        <CModalTitle>Kết quả học tập</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol md="3">
            <CLabel className="font-weight-bold" htmlFor="_class">
              Lớp học
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CustomSelect
              onChange={(_class: IClass) => setClass(_class)}
              value={chosenClass}
              options={classes.map(({ name, id }) => ({
                label: name,
                value: id,
                id,
                name,
              }))}
              defaultValue={null}
              isMulti={false}
              isDisabled={false}
              isWithinModal
            />
            <CFormText>Giáo viên chọn lớp trong khối </CFormText>
          </CCol>
        </CFormGroup>

        {isAdminView ? (
          <CFormGroup row>
            <CCol md="3">
              <CLabel className="font-weight-bold" htmlFor="subject">
                Môn học
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CustomSelect
                onChange={(subject: ISubject) => setChosenSubject(subject)}
                value={chosenSubject}
                options={subjects.map(({ name, _id }) => ({
                  label: name,
                  value: _id,
                  _id,
                  name,
                }))}
                defaultValue={null}
                isMulti={false}
                isDisabled={false}
                isWithinModal={true}
              />
            </CCol>
          </CFormGroup>
        ) : (
          <CFormGroup row>
            <CCol md="3">
              <CLabel className="font-weight-bold" htmlFor="subject">
                Môn học
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput value={user?.subject?.name || ''} readOnly />
            </CCol>
          </CFormGroup>
        )}

        <CRow>
          <CCol xs={12}>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs={12} className={`d-flex justify-content-between`}>
                    {chosenClass ? (
                      <p className={`lead m-0`}>
                        Bảng điểm lớp:{' '}
                        <span className={`font-weight-bold`}>{chosenClass.name}</span>{' '}
                      </p>
                    ) : (
                      ''
                    )}
                    {classResult.length ? (
                      <p className={`lead m-0`}>
                        Sĩ số lớp: <span className={`font-weight-bold`}>{classResult.length}</span>{' '}
                      </p>
                    ) : (
                      ''
                    )}
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  columnFilter={true}
                  items={classResult}
                  fields={isAdminView ? adminFields : teacherFields}
                  tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
                  hover
                  sorter
                  pagination
                  noItemsView={{
                    noResults: 'Không tìm thấy kết quả phù hợp',
                    noItems: 'Giáo viên vui lòng chọn lớp',
                  }}
                  loading={loading}
                  itemsPerPage={15}
                  itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [15, 30, 60] }}
                  scopedSlots={{
                    index: (_: IResult, i: number) => <td>{i + 1}</td>,
                    student: ({ student }: IResult) => (
                      <td>
                        <span className={`text-primary cursor-pointer`}>{student.name}</span>
                      </td>
                    ),
                    subject: ({ subject }: IResult) => <td>{subject.name}</td>,
                    score_type_1: ({ score_type_1 }: IResult) => <td>{score_type_1 || '_'}</td>,
                    score_type_2: ({ score_type_2 }: IResult) => <td>{score_type_2 || '_'}</td>,
                    score_type_3: ({ score_type_3 }: IResult) => <td>{score_type_3 || '_'}</td>,
                    score_type_4: ({ score_type_4 }: IResult) => <td>{score_type_4 || '_'}</td>,
                    show_details: (item: IResult) => {
                      return (
                        <td className="d-flex">
                          <CTooltip content="Cập nhật" placement="bottom">
                            <CButton
                              color="primary"
                              variant="outline"
                              size="sm"
                              onClick={toggleDetails(item._id)}
                            >
                              <FontAwesomeIcon
                                icon={details.includes(item._id) ? faCheckCircle : faPen}
                              />
                            </CButton>
                          </CTooltip>
                        </td>
                      );
                    },
                    details: (item: IResult) => {
                      return (
                        <CCollapse show={details.includes(item._id)}>
                          <Formik
                            enableReinitialize
                            validationSchema={validationSchema}
                            initialValues={item}
                            onSubmit={(rawValues: IResult) => {
                              const value = omit(rawValues, ['student', 'semester', 'subject']);
                              dispatch(updateEntity(value));
                            }}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                            }) => (
                              <>
                                {/* {JSON.stringify(errors)} */}
                                <CForm className="form-horizontal" onSubmit={handleSubmit}>
                                  <CCardBody>
                                    <CFormGroup row>
                                      <CCol md="3">
                                        <CLabel className="bold-600" htmlFor="score_type_1">
                                          Điểm miệng
                                        </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="9" className="p-0">
                                        <CInput
                                          onChange={handleChange}
                                          id="score_type_1"
                                          name="score_type_1"
                                          value={values.score_type_1 || ''}
                                          invalid={!!errors.score_type_1 && touched.score_type_1}
                                          onBlur={handleBlur}
                                        />
                                        <CInvalidFeedback>{errors.score_type_1}</CInvalidFeedback>
                                      </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                      <CCol md="3">
                                        <CLabel className="bold-600" htmlFor="score_type_2">
                                          Điểm 15 phút
                                        </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="9" className="p-0">
                                        <CInput
                                          onChange={handleChange}
                                          id="score_type_2"
                                          name="score_type_2"
                                          value={values.score_type_2 || ''}
                                          invalid={!!errors.score_type_2 && touched.score_type_2}
                                          onBlur={handleBlur}
                                        />
                                        <CInvalidFeedback>{errors.score_type_2}</CInvalidFeedback>
                                      </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                      <CCol md="3">
                                        <CLabel className="bold-600" htmlFor="score_type_3">
                                          Điểm 45 phút
                                        </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="9" className="p-0">
                                        <CInput
                                          onChange={handleChange}
                                          id="score_type_3"
                                          name="score_type_3"
                                          value={values.score_type_3 || ''}
                                          invalid={!!errors.score_type_3 && touched.score_type_3}
                                          onBlur={handleBlur}
                                        />
                                        <CInvalidFeedback>{errors.score_type_3}</CInvalidFeedback>
                                      </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                      <CCol md="3">
                                        <CLabel className="bold-600" htmlFor="score_type_4">
                                          Điểm học kỳ
                                        </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="9" className="p-0">
                                        <CInput
                                          onChange={handleChange}
                                          id="score_type_4"
                                          name="score_type_4"
                                          value={values.score_type_4 || ''}
                                          invalid={!!errors.score_type_4 && touched.score_type_4}
                                          onBlur={handleBlur}
                                        />
                                        <CInvalidFeedback>{errors.score_type_4}</CInvalidFeedback>
                                      </CCol>
                                    </CFormGroup>
                                  </CCardBody>

                                  <CCardFooter>
                                    <CButton
                                      type="submit"
                                      size="sm"
                                      color="primary"
                                      disabled={loading}
                                    >
                                      <CIcon name="cil-scrubber" /> Xác nhận
                                    </CButton>
                                    <CButton
                                      size="sm"
                                      color="danger"
                                      className="ml-3"
                                      disabled={loading}
                                      onClick={toggleDetails(item._id)}
                                    >
                                      <CIcon name="cil-arrow-left" /> Hủy
                                    </CButton>
                                  </CCardFooter>
                                </CForm>
                              </>
                            )}
                          </Formik>
                        </CCollapse>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  );
};

export default ResultModal;
