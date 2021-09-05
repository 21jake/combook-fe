import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, resetEntity } from './semester.reducer';
import { CButton, CCardBody, CDataTable, CTooltip } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { semesterSelectors } from './semester.reducer';
import {
  getEntities,
  removeEntity,
  // getEntityModels, removeEntity
} from './semester.api';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISemester } from '../../shared/models/semester.model';

interface ISemesterProps extends RouteComponentProps {}

const Semester = (props: ISemesterProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { selectAll } = semesterSelectors;
  const allSemesters = useSelector(selectAll);
  const { initialState } = useSelector((state: RootState) => state.semester);
  const { loading, deleteEntitySuccess, errorMessage } = initialState;

  const params = {
    page: 0,
    limit: 25,
  };

  useEffect(() => {
    dispatch(fetching());
    dispatch(getEntities(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (deleteEntitySuccess) {
      dispatch(resetEntity());
      return ToastSuccess('Xóa học kì thành công!');
    }
    if (errorMessage) {
      return ToastError(errorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteEntitySuccess, errorMessage]);

  const fields = [
    { key: 'id', _style: { width: '25%' }, label: 'STT' },
    { key: 'grade', _style: { width: '25%' }, label: 'Khối' },
    { key: 'name', _style: { width: '25%' }, label: 'Học kỳ' },
    { key: 'fee', _style: { width: '25%' }, label: 'Học phí' },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
    },
  ];

  return (
    <>
      <CButton color="primary" onClick={() => history.push(`${match.url}/create`)}>
        Tạo học kỳ mới
      </CButton>
      <CCardBody>
        <CDataTable
          columnFilter={true}
          items={allSemesters}
          fields={fields}
          tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
          hover
          sorter
          pagination
          loading={loading}
          itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
          scopedSlots={{
            show_details: (item: ISemester) => {
              return (
                <td className="d-flex">
                  <CTooltip content="Cập nhật" placement="bottom">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`${match.url}/${item._id}/update`)}
                      className={`ml-1 `}
                      // className={`ml-1 ${handleItemVisibility(Authorities)}`}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </CButton>
                  </CTooltip>

                  <CTooltip content="Xóa" placement="bottom">
                    <CButton
                      color="danger"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => dispatch(removeEntity(item._id))}
                      className={`ml-1 `}
                      // className={`ml-1 ${handleItemVisibility(Authorities)}`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </CButton>
                  </CTooltip>
                </td>
              );
            },
            grade: (item: ISemester) => {
              return (
                <td>{item.grade?.name || "Không xác định"}</td>
              )
            }
          }}
        />
      </CCardBody>
    </>
  );
};

export default Semester;
