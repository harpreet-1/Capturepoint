import Modal from "react-bootstrap/Modal";

function OrderCancleConfirmModal({
  showConfirmModal,
  handleConfirmYes,
  hidemodal,
  message,
}) {
  return (
    <>
      <Modal
        show={showConfirmModal}
        onHide={hidemodal}
        dialogClassName="modal-90w"
        // aria-labelledby="example-custom-modal-styling-title"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="orderCancleConfirmModal">
            <h3>{message}</h3>
            <div>
              <button onClick={handleConfirmYes} className="btn btn-danger">
                Yes
              </button>
              <button onClick={hidemodal} className="btn btn-primary">
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderCancleConfirmModal;
