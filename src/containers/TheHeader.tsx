import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CToggler,
  CBreadcrumbRouter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

// routes config
import routes from '../routes';
import { toggleAside, toggleDarkMode, toggleSidebar } from '../containers/reducer';
import { RootState } from '../shared/reducers';

const TheHeader = () => {
  const dispatch = useDispatch();

  const containerState = useSelector((state: RootState) => state.container);
  const { asideShow, darkMode, sidebarShow } = containerState;

  const toggleSidebarDesktop = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    // dispatch({type: 'set', sidebarShow: val})
    dispatch(toggleSidebar(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch(toggleSidebar(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebarDesktop} />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          // onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
          onClick={() => dispatch(toggleDarkMode(!darkMode))}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
        <CToggler
          inHeader
          className="d-md-down-none"
          // onClick={() => dispatch({type: 'set', asideShow: !asideShow})}
          onClick={() => dispatch(toggleAside(!asideShow))}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
