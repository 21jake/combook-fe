import CIcon from "@coreui/icons-react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../shared/reducers";
// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const containerState = useSelector((state: RootState) => state.container);
  const { sidebarShow } = containerState;

  return (
    <CSidebar
      show={sidebarShow}
      unfoldable
      onShowChange={(val: boolean) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
