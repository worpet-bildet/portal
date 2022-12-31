import { toast, ToastContainer } from 'react-toastify';

export class Notify {
  static success(message) {
    toast.success(message);
  }

  static error(message) {
    toast.success(message);
  }
}