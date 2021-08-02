import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSidebar, CSidebarClose } from '@coreui/react';

import { toggleAside } from './reducer';
import { RootState } from '../shared/reducers';

const TheAside = () => {
  // const show = useTypedSelector((state) => state.asideShow)
  const dispatch = useDispatch();
  const setState = (state: boolean) => dispatch(toggleAside(state));

  const containerState = useSelector((state: RootState) => state.container);
  const { asideShow } = containerState;

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="lg"
      overlaid
      show={asideShow}
      // onShowChange={(state: boolean) => setState(state)}
      onShowChange={(val: boolean) => dispatch(toggleAside(val))}
    >
      <CSidebarClose onClick={() => setState(false)} />
      {/*aside content*/}
      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">Aside</div>
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default React.memo(TheAside);
