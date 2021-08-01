import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CLink,
  CRow,
} from "@coreui/react";
import bxArrowBack from "@iconify-icons/bx/bx-arrow-back";
import { Icon } from "@iconify/react";
// import { fetching } from './auth.reducer';
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import loginImg from "../../assets/img/graph-lungwort-t.png";
import { ToastError } from "../../shared/components/Toast";
import { RootState } from "../../shared/reducers";
import { authenticate, login } from "./auth.api";
import { fetching, reset } from "./auth.reducer";

interface FormValues {
  username: string;
  password: string;
}

interface ILogin extends RouteComponentProps {}

const Login = (props: ILogin) => {
  // const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const changeLanguage = () => {
  //   if (i18n.language.includes("en")) {
  //     i18n.changeLanguage("vi");
  //   } else {
  //     i18n.changeLanguage("en");
  // }
  // };
  const authenticationState = useSelector((state: RootState) => state.authentication);
  const { loading, token, errorMessage, loginSuccess } = authenticationState;

  // useEffect(() => {
  //     // Hide sidebar until user successfully logs in
  //     dispatch(toggleSidebar(false));
  // }, [])

  useEffect(() => {
    const localStorageToken = localStorage.getItem("authentication_token");
    if (token || localStorageToken) {
      dispatch(fetching());
      dispatch(authenticate());
    }
  }, [token, dispatch]);

  React.useEffect(() => {
    if (loading && loginSuccess) {
      dispatch(reset());
    }
  }, [loading, loginSuccess, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
    }
  }, [errorMessage]);
  const initialValues: FormValues = { username: "", password: "" };

  return (
    <>
      <CCard className="loginComponent anft_card">
        <CCardHeader style={{ backgroundColor: "transparent", border: "none" }}>
          <a href="/" style={{ opacity: 0.6, textDecoration: "none" }} className="text-white">
            <Icon icon={bxArrowBack} className="bx" /> {t("anftApp.loginPage.goBack")}
          </a>
        </CCardHeader>

        <CCardBody style={{ display: "" }}>
          <CRow className="ml-0 mr-0">
            <CCol lg={5} md={12} className="position-relative">
              <img src={loginImg} className="img-fluid mt-100" alt="" />
            </CCol>
            <CCol lg={6} md={12}>
              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.username) {
                    errors.username = t("anftApp.loginPage.usernameError");
                  } else if (!values.password) {
                    errors.password = t("anftApp.loginPage.passwordError");
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(fetching());
                  dispatch(login(values));
                  // setSubmitting(false);
                }}
              >
                {({ isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol className="col-12 text-center mb-3">
                        <h4 className="text-uppercase anftLoginTitle">{t("anftApp.loginPage.login")}</h4>
                      </CCol>
                      <CCol xs={12}>
                        <CFormGroup>
                          <CLabel htmlFor="username" className="loginLabel">
                            {t("anftApp.loginPage.username")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="username"
                            autoComplete="off"
                            className="loginInput"
                            name="username"
                            value={values.username}
                            invalid={!!(errors.username && touched.username && errors.username)}
                          />
                          <CInvalidFeedback>{errors.username && touched.username && errors.username}</CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol xs={12}>
                        <CFormGroup>
                          <CLabel htmlFor="password" className="loginLabel">
                            {t("anftApp.loginPage.password")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="password"
                            autoComplete="off"
                            name="password"
                            type="password"
                            className="loginInput"
                            value={values.password}
                            invalid={!!(errors.password && touched.password && errors.password)}
                          />
                          <CInvalidFeedback>{errors.password && touched.password && errors.password}</CInvalidFeedback>
                        </CFormGroup>
                      </CCol>

                      <CCol className="col-12 mt-2 mb-2 text-center mb-5">
                        <CButton type="submit" color="info" className="loginButton px-4">
                          {t("anftApp.loginPage.login")}
                        </CButton>
                        <p className="mt-3 mb-3">
                          <CLink to="/" style={{ color: "#08bcf0" }}>
                            {t("anftApp.loginPage.forgotPassword")} ?
                          </CLink>
                        </p>
                        <p className="mt-3 mb-3 text-white">
                          {t("anftApp.loginPage.noAccount")}?
                          <CLink to="/register" className="ml-2 " style={{ color: "#08bcf0" }}>
                            {t("anftApp.loginPage.registerHere")}
                          </CLink>
                        </p>
                      </CCol>
                    </CRow>
                  </CForm>
                )}
              </Formik>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* </CModalBody>
      </CModal> */}
    </>
  );
};

export default Login;
