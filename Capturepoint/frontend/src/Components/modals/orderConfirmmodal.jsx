import Modal from "react-bootstrap/Modal";

function OrderConfirmModal({ showOrderConfirm, hidemodal }) {
  return (
    <>
      <Modal
        show={showOrderConfirm}
        onHide={hidemodal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%" }} className="orderConfirmImg">
            <img
              style={{ width: "100%" }}
              src="https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1486.jpg?w=2000"
              alt=""
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderConfirmModal;
