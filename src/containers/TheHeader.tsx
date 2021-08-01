import {
  CButton,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderBrand,
  CRow,
} from "@coreui/react";
import flagForUnitedStates from "@iconify-icons/emojione/flag-for-united-states";
import flagForVietnam from "@iconify-icons/emojione/flag-for-vietnam";
import { Icon } from "@iconify/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import logoImg from "../assets/img/ANT_logo.png";
import { RootState } from "../shared/reducers";
import handleLogout from "../views/auth/logout";

const TheHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authentication);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <CHeader style={{ backgroundColor: "transparent", boxShadow: "none" }}>
      {/* <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} /> */}
      <CContainer fluid>
        <CRow className=" justify-content-end py-2">
          <CCol xs={0} sm={4}></CCol>
          <CCol xs={4} sm={4} className="text-center">
            <CHeaderBrand className="mx-auto " to="/">
              <img style={{ maxHeight: "40px" }} src={logoImg} alt="" />
            </CHeaderBrand>
          </CCol>
          <CCol xs={8} sm={4} className="text-right">
            <CHeaderBrand className="mx-auto ">
              {/* <CButton color="info" className="loginButton px-4">
                Language
              </CButton> */}
              {/* <li className="drop-down">
                <a href="/">LANGUAGE</a>
                <ul>
                  <li>
                    <a href="/">English</a>
                  </li>
                  <li>
                    <a href="/">China</a>
                  </li>
                  <li>
                    <a href="/">Vietnamese</a>
                  </li>
                </ul>
              </li> */}
              <CDropdown>
                <CDropdownToggle className="language-btn">{t("anftApp.headerComponent.language")}</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    active={i18n.language.includes("en") ? true : false}
                    onClick={() => changeLanguage("en")}
                  >
                    <Icon icon={flagForUnitedStates} width="20px" height="20px" /> &nbsp;{" "}
                    {t("anftApp.headerComponent.english")}
                  </CDropdownItem>
                  <CDropdownItem
                    active={i18n.language.includes("vi") ? true : false}
                    onClick={() => changeLanguage("vi")}
                  >
                    <Icon icon={flagForVietnam} width="20px" height="20px" /> &nbsp;{" "}
                    {t("anftApp.headerComponent.vietnamese")}
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              {user && (
                <CButton className="logoutButton px-4 ml-2" onClick={handleLogout}>
                  {t("anftApp.global.logout")}
                </CButton>
              )}
            </CHeaderBrand>
          </CCol>
        </CRow>
      </CContainer>

      {/* <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
        <CToggler inHeader className="d-md-down-none" onClick={() => dispatch({ type: "set", asideShow: !asideShow })}>
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
      </CHeaderNav> */}

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
      </CSubheader> */}
    </CHeader>
  );
};

export default TheHeader;
