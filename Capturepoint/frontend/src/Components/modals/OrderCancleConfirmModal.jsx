import Modal from "react-bootstrap/Modal";

function OrderCancleConfirmModal({
  showOrderCancleConfirm,
  handleCancleOrder,
  hidemodal,
}) {
  return (
    <>
      <Modal
        show={showOrderCancleConfirm}
        onHide={hidemodal}
        dialogClassName="modal-90w"
        // aria-labelledby="example-custom-modal-styling-title"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="orderCancleConfirmModal">
            <h3>
              Are you sure you want to <span>Cancle</span> This Order.
            </h3>
            <div>
              <button onClick={handleCancleOrder} className="btn btn-danger">
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
