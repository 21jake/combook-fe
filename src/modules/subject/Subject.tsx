import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching } from './subject.reducer';
import { CButton, CCardBody, CDataTable, CTooltip } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { subjectSelectors } from './subject.reducer';
import {
  getEntities,
  removeEntity,
  // getEntityModels, removeEntity
} from './subject.api';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISubject } from '../../shared/models/subject.model';

interface ISubjectProps extends RouteComponentProps {}

const Subject = (props: ISubjectProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { selectAll } = subjectSelectors;
  const subjects = useSelector(selectAll);
  const { initialState } = useSelector((state: RootState) => state.subject);
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
      return ToastSuccess('Xóa môn học thành công!');
    }
    if (errorMessage) {
      return ToastError(errorMessage);
    }
  }, [deleteEntitySuccess, errorMessage]);


  const fields = [
    { key: '_id', _style: { width: '30%' }, label: 'STT' },
    { key: 'name', _style: { width: '70%' }, label: 'Tên môn học' },
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
        Tạo bộ môn mới
      </CButton>
      <CCardBody>
        <CDataTable
          columnFilter={true}
          items={subjects}
          fields={fields}
          tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
          hover
          sorter
          pagination
          loading={loading}
          itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
          scopedSlots={{
            show_details: (item: ISubject) => {
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

export default Subject;
