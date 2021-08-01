import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CSelect,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import bxCopy from "@iconify-icons/bx/bx-copy";
import bxEdit from "@iconify-icons/bx/bx-edit";
import bxLock from "@iconify-icons/bx/bx-lock";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import userAvatar from "../../assets/img/user-picture.png";
import { ToastSuccess } from "../../shared/components/Toast";

interface IDashboard extends RouteComponentProps {}

interface FormValues {
  anftWallet: string;
  transactionType: string;
  usdAmount: string;
  anftExchange: string;
}

const Dashboard = (props: IDashboard) => {
  // const handleFileUpload: React.FormEventHandler<any> = async (e: any) => {
  //   const inputFiles = e.target.files;
  //   if (inputFiles && inputFiles[0]) {
  //     const reader = new FileReader();
  //     console.log(inputFiles[0]);

  //     reader.onload = (e) => {
  //       setProfilePic(e.target?.result);
  //     };
  //     reader.readAsDataURL(inputFiles[0]);
  //   }
  // };
  const [activeKey, setActiveKey] = useState(1);
  const { t } = useTranslation();
  const initialValues: FormValues = {
    anftWallet: "",
    transactionType: "USD",
    usdAmount: "",
    anftExchange: "",
  };

  const validationSchema = Yup.object().shape({
    anftWallet: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.firstNameInvalid"))
      .max(50, t("anftApp.registerPage.warningText.firstNameInvalid"))
      .required(t("anftApp.registerPage.warningText.firstNameEmpty")),
    usdAmount: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.lastNameInvalid"))
      .max(50, t("anftApp.registerPage.warningText.lastNameInvalid"))
      .required(t("anftApp.registerPage.warningText.lastNameEmpty")),
    anftExchange: Yup.string()
      .min(1, t("anftApp.registerPage.warningText.nationalIdInvalid"))
      .max(50, t("anftApp.registerPage.warningText.nationalIdInvalid"))
      .required(t("anftApp.registerPage.warningText.nationalIdEmpty")),
  });

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    ToastSuccess("Copy to clipboard successfully");
  };

  const fields = [
    { key: "index", _style: { width: "5%" }, label: "STT" },
    { key: "name", _style: { width: "22.5%" }, label: "Tên người" },
    { key: "revenue", _style: { width: "22.5%" }, label: "Doanh thu(USD)" },
    { key: "joinDate", _style: { width: "22.5%" }, label: "Ngày vào" },
    { key: "commission", label: "Hoa hồng(%)", _style: { width: "22.5%" } },
  ];

  const usersData = [{ index: 1, name: "Nguyễn Quang A", revenue: "15000", joinDate: "20/07/2021", commission: "30%" }];

  return (
    <>
      <CCard className="loginComponent anft_card">
        <CCardBody style={{ display: "" }}>
          <CRow className="ml-0 mr-0">
            <CCol lg={5} md={12} className="position-relative">
              <CRow className="mt-150 justify-content-center">
                <div className="circle position-relative">
                  {/* <img className="profile-pic" src={profilePic} alt="userAvatar" /> */}
                  <Avatar className="profile-pic" maxInitials={2} size={"110px"} round={true} src={userAvatar} />
                </div>
                {/* <CLabel htmlFor="custom-file-input" className="p-image">
                  <Icon icon={bxsCamera} className="upload-button" />
                  <CInputFile id="custom-file-input" className="file-upload" onChange={handleFileUpload} />
                </CLabel> */}
                <CCol xs={12} className="text-center">
                  <CInput type="text" className="form-control text-center text-white" disabled value="TuanNA" />
                </CCol>
                <CCol xs={12} className="text-center">
                  <CInput type="text" className="form-control text-center text-white" disabled value="+84 988757598" />
                </CCol>
                <CCol xs={6} className="text-center">
                  <a href="/" style={{ textDecoration: "none", color: "#08bcf0" }}>
                    <Icon icon={bxEdit} className="bx" width={20} height={20} style={{ verticalAlign: "sub" }} /> Chỉnh
                    sửa
                  </a>
                </CCol>
                <CCol xs={6} className="text-center">
                  <a href="/" style={{ textDecoration: "none", color: "#08bcf0" }}>
                    <Icon icon={bxLock} className="bx" width={20} height={20} style={{ verticalAlign: "sub" }} /> Đổi
                    Mật khẩu
                  </a>
                </CCol>
              </CRow>
            </CCol>
            <CCol lg={7} md={12} className="mt-5">
              <ul className="nav nav-tabs border-bottom-0" id="myTab" role="tablist">
                <li className="nav-item">
                  <p
                    className={`nav-link ${activeKey === 1 ? "active" : ""}`}
                    onClick={() => setActiveKey(1)}
                    style={{ color: "#08bcf0" }}
                  >
                    Infomation
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${activeKey === 2 ? "active" : ""}`}
                    onClick={() => setActiveKey(2)}
                    style={{ color: "#08bcf0" }}
                  >
                    Buy
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={`nav-link ${activeKey === 3 ? "active" : ""}`}
                    onClick={() => setActiveKey(3)}
                    style={{ color: "#08bcf0" }}
                  >
                    Referral
                  </p>
                </li>
              </ul>
              <CTabContent className="tabContent">
                <CTabPane active={activeKey === 1}>
                  <CCol xs={12} className="mt-3">
                    <CLabel className="loginLabel" htmlFor="walletValue">
                      Ví ANFT
                    </CLabel>
                    <CInput
                      type="text"
                      id="walletValue"
                      className="form-control"
                      disabled
                      value="FAKSLKLSDFKSDL3423434902323SDFKSKLSSKDLKL"
                    />
                  </CCol>
                  <CCol xs={12} className="mt-3">
                    <CLabel className="loginLabel" htmlFor="walletNumber">
                      Số lượng ANFT
                    </CLabel>
                    <CInput type="text" id="walletNumber" className="form-control" disabled value="1200" />
                  </CCol>
                  <CCol xs={12} className="mt-3">
                    <CLabel className="loginLabel" htmlFor="walletStatus">
                      Trạng thái
                    </CLabel>
                    <CInput type="text" id="walletStatus" className="form-control" disabled value="Đã kích hoạt" />
                  </CCol>
                  <CCol xs={12} className="mt-3">
                    <CLabel className="loginLabel">Hệ sinh thái BĐS</CLabel>
                    <div className="antf_group">
                      <CButton className="antf-btn btn-antf1 "></CButton>
                      <CButton className="antf-btn btn-antf2"></CButton>
                      <CButton className="antf-btn btn-antf1 "></CButton>
                      <CButton className="antf-btn btn-antf2 "></CButton>
                      <CButton className="antf-btn btn-antf1 "></CButton>
                      <CButton className="antf-btn btn-antf2 "></CButton>
                    </div>
                  </CCol>
                </CTabPane>
                <CTabPane active={activeKey === 2}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                      // setSubmitting(false);
                      console.log(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                      <CForm onSubmit={handleSubmit}>
                        <CCol xs={12} className="mt-3">
                          <CFormGroup>
                            <CLabel htmlFor="anftWallet" className="loginLabel">
                              Ví ANFT
                            </CLabel>
                            <CInput
                              onChange={handleChange}
                              id="anftWallet"
                              autoComplete="off"
                              name="anftWallet"
                              className="loginInput"
                              value={values.anftWallet}
                              invalid={!!(errors.anftWallet && touched.anftWallet && errors.anftWallet)}
                            />
                            <CInvalidFeedback>
                              {errors.anftWallet && touched.anftWallet && errors.anftWallet}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                        <CCol xs={12} className="mt-3">
                          <CFormGroup>
                            <CLabel htmlFor="transactionType" className="loginLabel">
                              Phương thức thanh toán
                            </CLabel>
                            <CSelect onChange={handleChange} size="lg" name="transactionType" id="transactionType">
                              <option value="USD">USD</option>
                              <option value="ETH">ETH</option>
                              <option value="VND">VND</option>
                              <option value="Bitcoin">Bitcoin</option>
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                        <CCol xs={12} className="mt-3">
                          <CFormGroup>
                            <CLabel htmlFor="usdAmount" className="loginLabel">
                              Số USD đầu tư
                            </CLabel>
                            <CInput
                              onChange={handleChange}
                              id="usdAmount"
                              autoComplete="off"
                              name="usdAmount"
                              className="loginInput"
                              value={values.usdAmount}
                              invalid={!!(errors.usdAmount && touched.usdAmount && errors.usdAmount)}
                            />
                            <CInvalidFeedback>
                              {errors.usdAmount && touched.usdAmount && errors.usdAmount}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                        <CCol xs={12} className="mt-3">
                          <CFormGroup>
                            <CLabel htmlFor="anftExchange" className="loginLabel">
                              Quy đổi ANFT
                            </CLabel>
                            <CInput
                              onChange={handleChange}
                              id="anftExchange"
                              autoComplete="off"
                              name="anftExchange"
                              className="loginInput"
                              value={values.anftExchange}
                              invalid={!!(errors.anftExchange && touched.anftExchange && errors.anftExchange)}
                            />
                            <CInvalidFeedback>
                              {errors.anftExchange && touched.anftExchange && errors.anftExchange}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                        <CCol xs={12}>
                          <CButton type="submit" color="info" className="loginButton btn px-4">
                            Xác thực giao dịch
                          </CButton>
                        </CCol>
                      </CForm>
                    )}
                  </Formik>
                </CTabPane>
                <CTabPane active={activeKey === 3}>
                  <CRow>
                    <CCol xs={12} className="mt-3">
                      <small style={{ color: "#a89ffe" }}>
                        Toàn bộ hoa hồng sẽ được chuyển thành ANFT với tỉ giá quy đổi ở vòng mở bán công khai (0.015
                        USD) và sẽ được chuyển tới ví của bạn khi ANFT được chào bán trên sàn giao dịch (Tháng 12)
                      </small>
                    </CCol>
                    <CCol xs={12} className="position-relative mt-3">
                      <CLabel className="loginLabel" htmlFor="referentUrl">
                        Đường dẫn giới thiệu
                      </CLabel>
                      <CInput
                        type="text"
                        id="referentUrl"
                        className="form-control"
                        disabled
                        aria-describedby="helpId"
                        value="https://sale.anft.vn/signup?referral_code=9EB7A5"
                      />
                      <small id="helpId" style={{ color: "#a89ffe" }}>
                        Bạn sẽ nhận được 2F Bonus khi hỗ trợ các nhà đầu tư khác tham gia dự án F1: 3 % | F2: 1%
                      </small>
                      <p
                        onClick={() => copyToClipboard("https://sale.anft.vn/signup?referral_code=9EB7A5")}
                        style={{ textDecoration: "none", color: "#08bcf0" }}
                      >
                        <Icon icon={bxCopy} className="position-absolute iconcopy" />
                      </p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg={4} md={12}>
                      <CLabel className="loginLabel" htmlFor="referenceNumber">
                        Giới thiệu
                      </CLabel>
                      <CInput type="text" id="referenceNumber" className="form-control" disabled value="15" />
                    </CCol>
                    <CCol lg={4} md={12}>
                      <CLabel className="loginLabel" htmlFor="usdTotal">
                        Tổng USD
                      </CLabel>
                      <CInput type="text" id="usdTotal" className="form-control" disabled value="25" />
                    </CCol>
                    <CCol lg={4} md={12}>
                      <CLabel className="loginLabel" htmlFor="anftTotal">
                        Tổng ANFT
                      </CLabel>
                      <CInput type="text" id="anftTotal" className="form-control" disabled value="45" />
                    </CCol>
                    <CCol xs={12} className="referenceTable table-responsive mt-4">
                      <CDataTable items={usersData} fields={fields} itemsPerPage={5} pagination hover />
                    </CCol>
                    <CCol xs={12} className="referenceBtn text-center mt-3 mb-3">
                      <CButton className="btn btn-primary btn-sm mr-3 mb-3">Đăng ký làm đại lý</CButton>
                      <CButton className="btn btn-alt btn-sm mb-3">Đăng ký làm chuyên gia</CButton>
                    </CCol>
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
