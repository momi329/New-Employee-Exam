import Ship from "./Ship";
import Bus from "./Bus";
import Railway from "./Railway";
import "./style.scss";
function Tag({ listItem, type, handleOnClick }) {
  return (
    <div
      className={
        listItem.choosen
          ? "choosenTag flexRow alignCenter"
          : "flexRow alignCenter tag"
      }
      key={`traffic${listItem.TypeCode}`}
      onClick={handleOnClick}
    >
      {(type === "traffic" && listItem.img && listItem.TypeCode === "02" && (
        <Bus className={listItem.choosen ? "iconChoosen" : "icon"} />
      )) ||
        (listItem.img && listItem.TypeCode === "01" && (
          <Ship className={listItem.choosen ? "iconChoosen" : "icon"} />
        )) ||
        (listItem.img && listItem.TypeCode === "03" && (
          <Railway className={listItem.choosen ? "iconChoosen" : "icon"} />
        ))}
      {listItem.TypeName || listItem.TagName}
    </div>
  );
}
export default Tag;
