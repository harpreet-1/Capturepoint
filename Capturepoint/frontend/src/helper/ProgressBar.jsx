import ProgressBar from "react-bootstrap/ProgressBar";
import { useProgressBarContext } from "../Context/ProgressBarContext";

function ProgressBarComp() {
  const { progress } = useProgressBarContext();

  return (
    <div>
      <ProgressBar
        variant={"danger"}
        className="custom-progress"
        now={progress}
      />
    </div>
  );
}

export default ProgressBarComp;
