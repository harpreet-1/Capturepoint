import ProgressBar from "react-bootstrap/ProgressBar";
import { useProgressBarContext } from "../Context/ProgressBarContext";

function ProgressBarComp() {
  const { progress } = useProgressBarContext();

  return progress > 0 && progress < 90 ? (
    <div>
      <ProgressBar
        variant={"danger"}
        className="custom-progress"
        now={progress}
      />
    </div>
  ) : (
    <div></div>
  );
}

export default ProgressBarComp;
