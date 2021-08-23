import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching } from './semester.reducer';
import { CButton, CCardBody, CCollapse, CDataTable, CTooltip } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { semesterSelectors } from './semester.reducer';
import {
  getEntities,
  removeEntity,
  // getEntityModels, removeEntity
} from './semester.api';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { faEyeSlash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISemester } from '../../shared/models/semester.model';

interface ISemesterProps extends RouteComponentProps {}

const Semester = (props: ISemesterProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { selectAll } = semesterSelectors;
  const allSemesters = useSelector(selectAll);
  const { initialState } = useSelector((state: RootState) => state.semester);
  // const { loading, deleteEntitySuccess, errorMessage, totalItems } = initialState;
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
      return ToastSuccess('Xóa khối thành công!');
    }
    if (errorMessage) {
      return ToastError(errorMessage);
    }
  }, [deleteEntitySuccess, errorMessage]);

  const [details, setDetails] = useState<Array<any>>([]);

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

  const fields = [
    { key: 'id', _style: { width: '30%' }, label: 'STT' },
    { key: 'name', _style: { width: '40%' }, label: 'Học kỳ' },
    { key: 'fee', _style: { width: '30%' }, label: 'Học phí' },
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
                  <CTooltip content="Xem chi tiết" placement="bottom">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={toggleDetails(item._id)}
                    >
                      <FontAwesomeIcon icon={details.includes(item._id) ? faEyeSlash : faEye} />
                    </CButton>
                  </CTooltip>

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
                </td>
              );
            },

            details: (item: ISemester) => {
              return (
                <CCollapse show={details.includes(item._id)}>
                  <CCardBody>
                    <h4>Các lớp thuộc {item.name}</h4>

                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => dispatch(removeEntity(item._id))}
                      disabled={loading}
                    >
                      Xóa
                    </CButton>
                  </CCardBody>
                </CCollapse>
              );
            },
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

export default Semester;
