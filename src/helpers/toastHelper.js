import { toastValues } from './../constants/common/toastValues';
import { toast } from 'react-toastify';

export const successToast = (message) => toast.success(message, toastValues);

export const errorToast = (message) => toast.error(message, toastValues);

export const infoToast = (message) => toast.info(message, toastValues);

export const warningToast = (message) => toast.warning(message, toastValues);

export const darkToast = (message) => toast.dark(message, toastValues);
