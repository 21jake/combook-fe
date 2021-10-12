import {
    CCard,
    CCardBody, CCardHeader,
    CCol,
    CCollapse,
    CDataTable, CListGroup,
    CListGroupItem, CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ToastError } from '../../shared/components/Toast';
import { IGrade } from '../../shared/models/grade.model';
import { RootState } from '../../shared/reducers';
import { getEntities } from './result.api';
import {
    resetEntity, selectGrades,
    selectSemesters
} from './result.reducer';
import StudentModal from './StudentModal';


const fields = [{ key: 'name', _style: { width: '30%' }, filter: false, label: 'Khối' }];

interface IResultProps extends RouteComponentProps {}

const StudentResult = (props: IResultProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authentication);
  const { initialState } = useSelector((state: RootState) => state.result);
  const { loading, errorMessage } = initialState;
  const grades = useSelector(selectGrades());
  const semesters = useSelector(selectSemesters());

  const [chosenSemester, setChosenSemester] = useState<undefined | string>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const [details, setDetails] = useState<string[]>([]);
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
    if (user) {
      dispatch(getEntities({ page: 0, limit: 100, student: user._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);



  const onSemesterClicked = (semId: string) => () => {
    setChosenSemester(semId);
    setModalVisible(true)
  }

  const onModalClosed = () => {
    setChosenSemester(undefined);
    setModalVisible(false);
  };

  return (
    <CRow>
      <StudentModal
        isVisible={modalVisible}
        onAbort={onModalClosed}
        semester={chosenSemester}
      />


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
                              onClick={onSemesterClicked(sem._id)}
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
  );
};

export default StudentResult;
