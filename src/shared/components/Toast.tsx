import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { toast, ToastOptions } from 'react-toastify';


export const centerToast: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};


interface IProp  {
   message: string
}

const Success = (prop: IProp)  => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <FontAwesomeIcon className="toastSuccessIcon" icon={faCheckCircle} size="lg" color="#45D42D" />
    <div style={{ color: '#333333', marginLeft: '5px' }}>{prop.message}</div>
  </div>
);

const Error = (prop: IProp) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <FontAwesomeIcon className="toastSuccessIcon" icon={faExclamationTriangle} size="lg" color="#DC3545" />
    <div style={{ color: '#DC3545', marginLeft: '5px' }}>{prop.message}</div>
  </div>
);

export const ToastSuccess = (message: string) => {
  if (message) {
    toast(<Success message={message} />, centerToast);
  }
};

export const ToastError = (message: string) => {
  if (message) {
    toast(<Error message={message} />, centerToast);
  }
};
