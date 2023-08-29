import { ToastContainer } from 'react-toastify';

const ToastBody = ({ themeMode }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={themeMode}
      />
    </>
  );
};

export default ToastBody;
