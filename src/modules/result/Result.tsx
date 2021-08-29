import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching } from './result.reducer';
import {  CCardBody, CDataTable } from '@coreui/react';
import { RootState } from '../../shared/reducers';
// import { resultSelectors } from './result.reducer';
import { getEntities } from './result.api';
import { getEntities as getClasses } from '../class/class.api';
import { ToastError } from '../../shared/components/Toast';
import { semesterSelectors } from '../semester/semester.reducer';
import { ISemester } from '../../shared/models/semester.model';
// import { classSelectors } from '../class/class.reducer';

interface IResultProps extends RouteComponentProps {}

const Result = (props: IResultProps) => {
  // const { history, match } = props;
  const dispatch = useDispatch();
  // const { selectAll } = resultSelectors;
  const { selectAll: selectAllSemesters } = semesterSelectors;
  // const { selectAll: selectAllClasses } = classSelectors;

  // const results = useSelector(selectAll);
  const semesters = useSelector(selectAllSemesters);
  // const classes = useSelector(selectAllClasses);

  const { initialState } = useSelector((state: RootState) => state.subject);
  // const { loading, deleteEntitySuccess, errorMessage, totalItems } = initialState;
  const { loading, errorMessage } = initialState;

  const params = {
    page: 0,
    limit: 100,
  };

  useEffect(() => {
    dispatch(fetching());
    dispatch(getEntities(params));
    dispatch(getClasses({ page: 0, limit: 50 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorMessage) {
      return ToastError(errorMessage);
    }
  }, [errorMessage]);

  const fields = [
    { key: 'index', _style: { width: '30%' }, label: 'STT' },
    { key: 'name', _style: { width: '30%' }, label: 'Học kỳ' },
    { key: 'grade', _style: { width: '30%' }, label: 'Khối' }
  ];


  // useEffect(() => {
  //   console.log(semesters, 'semesters');
  // }, [semesters]);

  // useEffect(() => {
  //   console.log(results, 'results');
  // }, [results]);

  // useEffect(() => {
  //   console.log(classes, 'classes');
  // }, [classes]);



  return (
    <>
      {/* <CButton color="primary" onClick={() => history.push(`${match.url}/create`)}>
        Tạo bộ môn mới
      </CButton> */}
      <CCardBody>
        <CDataTable
          columnFilter={true}
          items={semesters}
          fields={fields}
          tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
          hover
          sorter
          pagination
          loading={loading}
          itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
          scopedSlots={{
            // details: (item: ISemester) => {
            //   return (
            //     <CCollapse show={details.includes(item._id)}>
            //       <CCardBody>
            //         <p className="lead">{item.grade?.name}</p>
            //         {classes
            //           .filter((e) => e.grade?._id === item.grade?._id)
            //           .map((cls, i) => (
            //             <p key={`class-${i}`}>{cls.name}</p>
            //           ))}
            //       </CCardBody>
            //     </CCollapse>
            //   );
            // },
            index: (_: ISemester, i: number) => <td>{i + 1}</td>,
            grade: ({ grade }: ISemester) => <td>{grade?.name}</td>,
          }}
        />
        {/* {totalPages > 1 ? (
          <CPagination
            disabled={loading}
            activePage={filterState.page + 1}
            pages={totalPages}
            onActivePageChange={handlePaginationChange}
          />
        ) : (
          ''
        )} */}
      </CCardBody>
    </>
  );
};

export default Result;
