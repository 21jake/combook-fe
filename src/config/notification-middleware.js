import { ToastError, ToastSuccess } from "../shared/components/Toast";
const statusError = {
  401: "Bạn chưa đăng nhập vào hệ thống",
  400: "Bạn đã nhập dữ liệu không đúng",
  403: "Bạn không có quyền thực hiện hành động này",
  409: "Dữ liệu đã tồn tại trên hệ thống.",
  500: "Lỗi hệ thống. Vui lòng thử lại",
};

export default () => (next) => (action) => {
  // If not a promise, continue on
  console.log(action);
  console.log(action.payload);
  if (action.payload) {
    if (action.payload && action.payload.statusCode === 200) {
      ToastSuccess(statusError[action.payload.statusCode]);
    } else {
      ToastError(statusError[action.payload.statusCode]);
    }
  }

  return next(action);
};
