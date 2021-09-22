import {
    CBadge, CCol, CDataTable, CFormGroup, CInput, CLabel,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';
import { capitalize, sumBy } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { mapStudentBadge, mapStudentType, returnTypeBaseOnAverage } from '../../shared/enum/studentType';
import { IResult } from '../../shared/models/result.model';
import { RootState } from '../../shared/reducers';
import { selectResultsBySemId } from './result.reducer';

const fields = [
  { key: 'index', _style: { width: '5%' }, label: 'STT' },
  { key: 'subject', _style: { width: '20%' }, label: 'Môn học' },
  { key: 'score_type_1', _style: { width: '15%' }, label: 'Điểm miệng' },
  { key: 'score_type_2', _style: { width: '15%' }, label: 'Điểm 15 phút' },
  { key: 'score_type_3', _style: { width: '15%' }, label: 'Điểm 45 phút' },
  { key: 'score_type_4', _style: { width: '15%' }, label: 'Điểm học kỳ' },
  { key: 'average', _style: { width: '15%' }, label: 'Trung bình môn' },
];

interface IModalProps {
  isVisible: boolean;
  onAbort: () => void;
  semester: string | undefined;
}



const StudentModal = ({ isVisible, onAbort, semester }: IModalProps) => {
  const results = useSelector(selectResultsBySemId(semester));
  const { user } = useSelector((state: RootState) => state.authentication);

  const semesterName = results.length ? results[0].semester.name : '';

  const semesterAverage = (sumBy(results, 'average') / results.length);

    const studentType = returnTypeBaseOnAverage(semesterAverage)



  return (
    <CModal show={isVisible} color="primary" onClose={onAbort} size={'xl'}>
      <CModalHeader closeButton>
        <CModalTitle>Kết quả học tập {semesterName}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className={`justify-content-center`}>
          <CCol xs={8}>
            <CFormGroup row>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="student">
                  Học sinh
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput value={user?.name || ''} readOnly />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="average">
                  Điểm trung bình
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput value={semesterAverage.toPrecision(2)} readOnly />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="type">
                  Xếp loại học lực
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
              <CBadge color={mapStudentBadge[studentType]}>{capitalize(mapStudentType[studentType])}</CBadge>
              </CCol>
            </CFormGroup>
          </CCol>

          <CCol xs={12}>
            <CDataTable
              columnFilter={true}
              items={results}
              fields={fields}
              hover
              sorter
              pagination
              itemsPerPage={50}
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
                average: ({ average }: IResult) => <td>{average ? average.toPrecision(2)  : '_'}</td>,

              }}
            />
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  );
};

export default StudentModal;
