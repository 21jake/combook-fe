import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CInvalidFeedback,
  CLabel,
  CLink,
  CRow,
} from "@coreui/react";
import bxArrowBack from "@iconify-icons/bx/bx-arrow-back";
import bxsCamera from "@iconify-icons/bx/bxs-camera";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import loginImg from "../../assets/img/graph-lungwort-t.png";
import userAvatar from "../../assets/img/user-picture.png";
import { ToastError, ToastSuccess } from "../../shared/components/Toast";
import { RootState } from "../../shared/reducers";
import { register } from "./auth.api";
import { fetching, reset } from "./auth.reducer";

interface FormValues {
  imageUrl: string;
  lastName: string;
  firstName: string;
  username: string;
  nationalId: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface IRegister extends RouteComponentProps {}

const Register = (props: IRegister) => {
  const { history } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [profilePic, setProfilePic] = useState<any>(userAvatar);
  const initialValues: FormValues = {
    imageUrl: "",
    lastName: "",
    firstName: "",
    username: "",
    nationalId: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  const authenticationState = useSelector((state: RootState) => state.authentication);
  const { loading, token, errorMessage, registerSuccess } = authenticationState;

  // useEffect(() => {
  //     // Hide sidebar until user successfully logs in
  //     dispatch(toggleSidebar(false));
  // }, [])

  // useEffect(() => {
  //     const localStorageToken = localStorage.getItem('authentication_token')
  //     if (token || localStorageToken) {
  //         dispatch(toggleSidebar('responsive'));
  //         dispatch(fetching());
  //         dispatch(authenticate());
  //     }
  // }, [token])
  console.log(loading, registerSuccess);

  React.useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
    }
  }, [errorMessage, registerSuccess]);

  React.useEffect(() => {
    if (loading && registerSuccess) {
      ToastSuccess(t("anftApp.global.registerSucessfull"));
      dispatch(reset());
      history.push("/login");
    }
  }, [loading, registerSuccess]);

  const handleFileUpload: React.FormEventHandler<any> = async (e: any) => {
    const inputFiles = e.target.files;
    if (inputFiles && inputFiles[0]) {
      const reader = new FileReader();
      console.log(inputFiles[0]);

      reader.onload = (e) => {
        setProfilePic(e.target?.result);
      };
      reader.readAsDataURL(inputFiles[0]);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.firstNameInvalid"))
      .max(50, t("anftApp.registerPage.warningText.firstNameInvalid"))
      .required(t("anftApp.registerPage.warningText.firstNameEmpty")),
    lastName: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.lastNameInvalid"))
      .max(50, t("anftApp.registerPage.warningText.lastNameInvalid"))
      .required(t("anftApp.registerPage.warningText.lastNameEmpty")),
    nationalId: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.nationalIdInvalid"))
      .max(50, t("anftApp.registerPage.warningText.nationalIdInvalid"))
      .required(t("anftApp.registerPage.warningText.nationalIdEmpty")),
    username: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.usernameInvalid"))
      .max(50, t("anftApp.registerPage.warningText.usernameInvalid"))
      .required(t("anftApp.registerPage.warningText.usernameEmpty")),
    email: Yup.string()
      .email(t("anftApp.registerPage.warningText.emailInvalid"))
      .required(t("anftApp.registerPage.warningText.emailEmpty")),
    phoneNumber: Yup.string()
      .required(t("anftApp.registerPage.warningText.phoneNumberEmpty"))
      .min(13, t("anftApp.registerPage.warningText.phoneNumberInvalid"))
      .min(10, t("anftApp.registerPage.warningText.phoneNumberInvalid"))
      .matches(/^[0-9\-\+]{9,12}$/, t("anftApp.registerPage.warningText.phoneNumberInvalid")),
    password: Yup.string().required(t("anftApp.registerPage.warningText.passwordEmpty")),
    confirmPassword: Yup.string()
      .required(t("anftApp.registerPage.warningText.confirmPasswordEmpty"))
      .test("passwords-match", t("anftApp.registerPage.warningText.confirmPasswordNotMatch"), function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <>
      <CCard className="loginComponent anft_card">
        <CCardHeader style={{ backgroundColor: "transparent", border: "none" }}>
          <CLink to="/" style={{ opacity: 0.6, textDecoration: "none" }} className="text-white">
            <Icon icon={bxArrowBack} className="bx" />
            {t("anftApp.registerPage.goBack")}
          </CLink>
        </CCardHeader>

        <CCardBody style={{ display: "" }}>
          <CRow className="ml-0 mr-0">
            <CCol lg={5} md={12} className="position-relative">
              <img src={loginImg} className="img-fluid mt-150" alt="" />
            </CCol>
            <CCol lg={6} md={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  const registerForm = {
                    imageUrl: profilePic,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    email: values.email,
                    phone: values.phoneNumber,
                    login: values.username,
                    address: "123NCT",
                  };
                  dispatch(fetching());
                  dispatch(register(registerForm));
                  // setSubmitting(false);
                }}
                validationSchema={validationSchema}
              >
                {({ isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol className="col-12 text-center mb-3">
                        <h4 className="text-uppercase anftLoginTitle">{t("anftApp.registerPage.register")}</h4>
                      </CCol>
                      <CCol xs={12}>
                        <CRow className="justify-content-center">
                          <CFormGroup className="profileImageContainer">
                            <div className="circle position-relative">
                              {/* <img className="profile-pic" src={profilePic} alt="userAvatar" /> */}
                              <Avatar
                                className="profile-pic"
                                maxInitials={2}
                                size={"110px"}
                                round={true}
                                src={profilePic}
                              />
                            </div>
                            <CLabel htmlFor="custom-file-input" className="p-image">
                              <Icon icon={bxsCamera} className="upload-button" />
                              <CInputFile id="custom-file-input" className="file-upload" onChange={handleFileUpload} />
                            </CLabel>
                            {/* <div className="p-image">
                              <Icon icon={bxsCamera} className="upload-button" />
                              <CInputFile className="file-upload" onChange={handleFileUpload} />
                            </div> */}
                          </CFormGroup>
                        </CRow>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="lastName" className="loginLabel">
                            {t("anftApp.registerPage.lastName")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="lastName"
                            autoComplete="off"
                            name="lastName"
                            className="loginInput"
                            value={values.lastName}
                            invalid={!!(errors.lastName && touched.lastName && errors.lastName)}
                          />
                          <CInvalidFeedback>{errors.lastName && touched.lastName && errors.lastName}</CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="firstName" className="loginLabel">
                            {t("anftApp.registerPage.firstName")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="firstName"
                            autoComplete="off"
                            name="firstName"
                            className="loginInput"
                            value={values.firstName}
                            invalid={!!(errors.firstName && touched.firstName && errors.firstName)}
                          />
                          <CInvalidFeedback>
                            {errors.firstName && touched.firstName && errors.firstName}
                          </CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="username" className="loginLabel">
                            {t("anftApp.registerPage.username")}
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
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="nationalId" className="loginLabel">
                            {t("anftApp.registerPage.nationalId")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="nationalId"
                            autoComplete="off"
                            name="nationalId"
                            className="loginInput"
                            value={values.nationalId}
                            invalid={!!(errors.nationalId && touched.nationalId && errors.nationalId)}
                          />
                          <CInvalidFeedback>
                            {errors.nationalId && touched.nationalId && errors.nationalId}
                          </CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="email" className="loginLabel">
                            {t("anftApp.registerPage.email")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="email"
                            autoComplete="off"
                            name="email"
                            className="loginInput"
                            value={values.email}
                            invalid={!!(errors.email && touched.email && errors.email)}
                          />
                          <CInvalidFeedback>{errors.email && touched.email && errors.email}</CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="phoneNumber" className="loginLabel">
                            {t("anftApp.registerPage.phoneNumber")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="phoneNumber"
                            autoComplete="off"
                            name="phoneNumber"
                            className="loginInput"
                            value={values.phoneNumber}
                            invalid={!!(errors.phoneNumber && touched.phoneNumber && errors.phoneNumber)}
                          />
                          <CInvalidFeedback>
                            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                          </CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="password" className="loginLabel">
                            {t("anftApp.registerPage.password")}
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
                      <CCol lg={6} md={12}>
                        <CFormGroup>
                          <CLabel htmlFor="confirmPassword" className="loginLabel">
                            {t("anftApp.registerPage.confirmPassword")}
                          </CLabel>
                          <CInput
                            onChange={handleChange}
                            id="confirmPassword"
                            autoComplete="off"
                            name="confirmPassword"
                            type="password"
                            className="loginInput"
                            value={values.confirmPassword}
                            invalid={!!(errors.confirmPassword && touched.confirmPassword && errors.confirmPassword)}
                          />
                          <CInvalidFeedback>
                            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                          </CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                      <CCol xs={12}>
                        <p style={{ color: "#a89ffe" }}>{t("anftApp.registerPage.registerText")}</p>
                      </CCol>
                      <CCol className="col-12 mt-2 mb-2 text-center mb-5">
                        <CButton type="submit" color="info" className="loginButton px-4">
                          {t("anftApp.registerPage.register")}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                )}
              </Formik>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Register;
