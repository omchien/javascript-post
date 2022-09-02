import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toast = {
  info(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#29b6f6',
      },
    }).showToast();
  },

  success(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#66bb6a',
      },
    }).showToast();
  },

  error(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#f44336',
      },
    }).showToast();
  },
};
