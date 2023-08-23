import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useAlertContext } from "../Context/AlertContext";
function Alertbox() {
  const { showA, alertData, toggleShowA } = useAlertContext();

  return (
    <>
      <div id="alertbox">
        <ToastContainer
          //   className="p-3"
          //   position={"top-right"}
          style={{ zIndex: 100000 }}
        >
          <Toast bg={alertData.type} show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <strong className="me-auto">CapturePoint</strong>
            </Toast.Header>
            <Toast.Body>{alertData.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default Alertbox;
