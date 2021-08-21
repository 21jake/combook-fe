import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetching } from './user.reducer';
import { CBadge, CButton, CCardBody, CDataTable, CTooltip } from '@coreui/react';
import { RootState } from '../../shared/reducers';
import { userSelectors } from './user.reducer';
import { getEntities } from './user.api';
import { ToastError, ToastSuccess } from '../../shared/components/Toast';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from '../../shared/models/user.model';
import { mapRole, mapRoleBadge } from '../../shared/enum/role';
import { IClass } from '../../shared/models/class.model';
import { capitalize } from 'lodash';
import { ISubject } from '../../shared/models/subject.model';

interface IUserProps extends RouteComponentProps {}

const User = (props: IUserProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { selectAll } = userSelectors;
  const users = useSelector(selectAll);
  const { initialState } = useSelector((state: RootState) => state.user);
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
      return ToastSuccess('Xóa nguời dùng thành công!');
    }
    if (errorMessage) {
      return ToastError(errorMessage);
    }
  }, [deleteEntitySuccess, errorMessage]);

  const fields = [
    { key: 'index', _style: { width: '5%' }, label: 'STT' },
    { key: 'name', _style: { width: '20%' }, label: 'Tên người dùng' },
    { key: 'role', _style: { width: '15%' }, label: 'Vai trò' },
    { key: 'email', _style: { width: '20%' }, label: 'Email' },
    { key: '_class', _style: { width: '20%' }, label: 'Lớp' },
    { key: 'subject', _style: { width: '20%' }, label: 'Bộ môn' },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
    },
  ];

  const returnClassName = (_class: string | IClass | undefined) => {
    if (!_class || typeof _class === 'string') return '';
    return _class.name;
  };
  const returnSubjectName = (subject: string | ISubject | undefined) => {
    if (!subject || typeof subject === 'string') return '';
    return subject.name;
  };

  return (
    <>
      <CButton color="primary" onClick={() => history.push(`${match.url}/create`)}>
        Tạo người dùng mới
      </CButton>
      <CCardBody>
        <CDataTable
          columnFilter={true}
          items={users}
          fields={fields}
          tableFilter={{ label: 'Tìm kiếm', placeholder: 'Nhập từ khóa' }}
          hover
          sorter
          pagination
          loading={loading}
          itemsPerPageSelect={{ label: 'Số bản ghi mỗi trang', values: [25, 50, 75, 100, 200] }}
          scopedSlots={{
            index: (_: IUser, i: number) => {
              return <td>{i + 1}</td>;
            },
            show_details: (item: IUser) => {
              return (
                <td className="d-flex">
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
            role: (item: IUser) => {
              return (
                <td>
                  <CBadge color={mapRoleBadge[item.role]}>{capitalize(mapRole[item.role])}</CBadge>
                </td>
              );
            },
            _class: (item: IUser) => {
              return <td>{returnClassName(item._class)}</td>;
            },
            subject: (item: IUser) => {
              return <td>{returnSubjectName(item.subject)}</td>;
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

export default User;
