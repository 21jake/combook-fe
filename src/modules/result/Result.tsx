import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching } from './result.reducer';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { ToastError } from '../../shared/components/Toast';
import { selectGrades, semesterSelectors, resetEntity } from '../semester/semester.reducer';
import { getEntities as getSemesters } from '../semester/semester.api';
import { IGrade } from '../../shared/models/grade.model';
import ResultModal from './ResultModal';

interface IResultProps extends RouteComponentProps {}

const Result = (props: IResultProps) => {
  const dispatch = useDispatch();
  const { selectAll: selectAllSemesters } = semesterSelectors;

  const semesters = useSelector(selectAllSemesters);
  const grades = useSelector(selectGrades());

  const { initialState } = useSelector((state: RootState) => state.semester);
  const { loading, errorMessage } = initialState;

  const params = {
    page: 0,
    limit: 100,
  };

  const [details, setDetails] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [chosenSemester, setChosenSemester] = useState<undefined | string>(undefined);
  const [chosenGrade, setChosenGrade] = useState<undefined | string>(undefined);

  useEffect(() => {
    dispatch(fetching());
    dispatch(getSemesters(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const fields = [{ key: 'name', _style: { width: '30%' }, filter: false, label: 'Khối' }];

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

  const onSemesterClicked = (semId: string, gradeId: string | undefined) => {
    setChosenSemester(semId);
    setChosenGrade(gradeId);
    setModalVisible(true);
  };
  const onModalClosed = () => {
    setChosenSemester(undefined);
    setChosenGrade(undefined);
    setModalVisible(false);
  };

  return (
    <>
      <ResultModal
        isVisible={modalVisible}
        onAbort={onModalClosed}
        semester={chosenSemester}
        grade={chosenGrade}
      />
      <CRow>
        <CCol xs={12}>
          <CDataTable
            columnFilter={true}
            items={grades}
            fields={fields}
            hover
            header={false}
            sorter
            pagination
            loading={loading}
            scopedSlots={{
              name: ({ _id, name }: IGrade) => (
                <td>
                  <span className={`text-primary cursor-pointer`} onClick={toggleDetails(_id)}>
                    {name}
                  </span>
                </td>
              ),
              details: (item: IGrade) => {
                return (
                  <CCollapse show={details.includes(item._id)}>
                    <CCard>
                      <CCardHeader>
                        Các kỳ của khối: <span className={`font-weight-bold`}>{item.name}</span>
                      </CCardHeader>
                      <CCardBody>
                        <CListGroup className={`w-50`}>
                          {semesters
                            .filter((e) => e.grade?._id === item._id)
                            .map((sem, i) => (
                              <CListGroupItem
                                key={`sem-${i}`}
                                action
                                className={`cursor-pointer`}
                                onClick={() => onSemesterClicked(sem._id, sem.grade?._id)}
                              >
                                {sem.name}
                              </CListGroupItem>
                            ))}
                        </CListGroup>
                      </CCardBody>
                    </CCard>
                  </CCollapse>
                );
              },
            }}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Result;
