import Modal from "react-bootstrap/Modal";

import Alertbox from "../../helper/Alert";
import { useAlertContext } from "../../Context/AlertContext";

function AlertModel() {
  const { showA, toggleShowA } = useAlertContext();

  return (
    <>
      <Modal
        backdropClassName="alertmodel-backdrop"
        show={showA}
        onHide={toggleShowA}
        dialogClassName="alertmodel"
      >
        <Alertbox />
      </Modal>
    </>
  );
}

export default AlertModel;
