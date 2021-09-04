import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching, resetEntity } from './tuition.reducer';
import { CButton, CCardBody, CDataTable, CTooltip, CCollapse } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { tuitionSelectors } from './tuition.reducer';
import {
  getEntities,
  removeEntity,
  // getEntityModels, removeEntity
} from './tuition.api';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITuition } from '../../shared/models/tuition.model';
import { IUser } from '../../shared/models/user.model';
import { ISemester } from '../../shared/models/semester.model';

interface ITuitionProps extends RouteComponentProps { }

const Tuition = (props: ITuitionProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { selectAll } = tuitionSelectors;
  const allTuitions = useSelector(selectAll);
  const { initialState } = useSelector((state: RootState) => state.tuition);
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
    { key: 'semester', _style: { width: '25%' }, label: 'Học kỳ' },
    { key: 'user', _style: { width: '25%' }, label: 'Tên' },
    { key: 'isPaid', _style: { width: '25%' }, label: 'Tình trạng' },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
    },
  ];

  const returnSemester = (semester: string | ISemester | undefined) => {
    if (!semester || typeof semester === 'string') return '';
    return semester.name;
  };

  const returnUser = (user: string | IUser | undefined) => {
    if (!user || typeof user === 'string') return '';
    return user.name;
  };

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

  console.log(allTuitions, 'allSemesters');

  return (
    <>
      <CButton color="primary" onClick={() => history.push(`${match.url}/create`)}>
        Tạo học kỳ mới
      </CButton>
      <CCardBody>
        <CDataTable
          columnFilter={true}
          items={allTuitions}
          fields={fields}
          tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
          hover
          sorter
          pagination
          loading={loading}
          itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
          scopedSlots={{
            show_details: (item: ITuition) => {
              return (
                <td className="d-flex">
                  <CTooltip content="Xem chi tiết" placement="bottom">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={toggleDetails(item.id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </CButton>
                  </CTooltip>

                  <CTooltip content="Cập nhật" placement="bottom">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => history.push(`${match.url}/${item.id}/update`)}
                      className={`ml-1 `}
                    // className={`ml-1 ${handleItemVisibility(Authorities)}`}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </CButton>
                  </CTooltip>
                </td>
              );
            },
            user: (item: ITuition) => {
              return <td>{returnUser(item.user)}</td>;
            },
            semester: (item: ITuition) => {
              return <td>{returnSemester(item.semester)}</td>;
            },
            isPaid: (item: ITuition) => {
              return <td>{item.isPaid === false ? 'Chưa đóng tiền học' : 'Đã đóng tiền học'}</td>;
            },
            details: (item: ITuition) => {
              return (
                <CCollapse show={details.includes(item.id)}>
                  <CCardBody>
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => dispatch(removeEntity(item.id))}
                      disabled={loading}
                    >
                      Xóa
                    </CButton>
                  </CCardBody>
                </CCollapse>
              );
            },
            // grade: (item: ITuition) => {
            //   return (
            //     <td>{item.grade?.name || "Không xác định"}</td>
            //   )
            // }
          }}
        />
      </CCardBody>
    </>
  );
};

export default Tuition;
