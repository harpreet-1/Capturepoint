import Modal from "react-bootstrap/Modal";

function OrderCancleConfirmModal({ showOrderCancleConfirm, hidemodal }) {
  return (
    <>
      <Modal
        show={showOrderCancleConfirm}
        onHide={hidemodal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="orderCancleConfirmModal">
            <h3>Are You Sure You want to Cancle This Order</h3>
            <div>
              <button className="btn btn-primary"></button>
              <button className="btn btn-danger"></button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderCancleConfirmModal;
