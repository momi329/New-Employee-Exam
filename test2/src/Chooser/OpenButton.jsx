import "./style.scss";
import more from "../imgs/expand-button.png";

function OpenButton({ toggle, setToggle, index }) {
  return (
    <div
      className="handleOption flexRow "
      onClick={() => {
        const newData = [...toggle];
        newData[index] = !newData[index];
        setToggle(newData);
      }}
    >
      <p className="line">|</p>
      <p className="more">{toggle[index] ? "更多" : "收合"}</p>
      <img
        src={more}
        alt="more"
        className={toggle[index] ? "iconMore" : "iconMore rotate"}
      />
    </div>
  );
}
export default OpenButton;
