//import './Modal.css';


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <button type="button" onClick={handleClose}>
          Close
        </button>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

export default Modal;