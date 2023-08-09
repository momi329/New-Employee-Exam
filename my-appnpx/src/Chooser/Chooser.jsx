import { useState } from "react";
import CategoryList from "../CategoryList";
import Ship from "./Ship";
import Bus from "./Bus";
import Railway from "./Railway";
import more from "../imgs/expand-button.png";
import "./style.scss";
const TripTypeList = [
  {
    TypeName: "郵輪",
    TypeCode: "01",
    choosen: false,
    img: Ship,
  },
  {
    TypeName: "巴士",
    TypeCode: "02",
    choosen: false,
    img: Bus,
  },
  {
    TypeName: "鐵路",
    TypeCode: "03",
    choosen: false,
    img: Railway,
  },
  {
    TypeName: "航空",
    TypeCode: "04",
    choosen: false,
  },
];
function productListMaker(index) {
  const productListArr = [];
  const list = [];
  CategoryList[index].TypeList.forEach((type) => {
    type.GroupList.forEach((tagList) => {
      tagList.TagList.forEach((item) =>
        productListArr.push({
          ...item,
          TripTypeCode: type.TripTypeCode,
          choosen: false,
        })
      );
    });
  });
  list.forEach((tag) => {
    productListArr.push(...tag.TagList);
  });
  return productListArr;
}
const productList = productListMaker(0);
const marketingList = productListMaker(1);
const trafficList = productListMaker(2);

function Chooser() {
  const [toggle, setToggle] = useState([null, true, true, null]);
  const [choosenData, setChoosenData] = useState({
    traffic: TripTypeList,
    trafficformat: trafficList,
    productFormat: productList,
    marcketing: marketingList,
  });
  return (
    <section className="chooser">
      <div className="flexRow">
        <div className="title">遊玩交通</div>
        <div className="flexRow listItem">
          {choosenData.traffic.map((listItem, listItemIndex) => (
            <div
              className={
                listItem.choosen
                  ? "choosenTag flexRow alignCenter"
                  : "flexRow alignCenter tag"
              }
              key={listItem.TypeCode}
              onClick={() => {
                const newData = { ...choosenData };
                newData.traffic[listItemIndex].choosen =
                  !newData.traffic[listItemIndex].choosen;
                setChoosenData(newData);
              }}
            >
              {(listItem.img && listItem.TypeCode === "02" && (
                <Bus className={listItem.choosen ? "iconChoosen" : "icon"} />
              )) ||
                (listItem.img && listItem.TypeCode === "01" && (
                  <Ship className={listItem.choosen ? "iconChoosen" : "icon"} />
                )) ||
                (listItem.img && listItem.TypeCode === "03" && (
                  <Railway
                    className={listItem.choosen ? "iconChoosen" : "icon"}
                  />
                ))}
              {listItem.TypeName}
            </div>
          ))}
        </div>
      </div>
      {choosenData.traffic.some(
        (tripType) =>
          (tripType.TypeCode === "01" && tripType.choosen) ||
          (tripType.TypeCode === "03" && tripType.choosen)
      ) && (
        <div className="flexRow">
          <div className="title">鐵道規格</div>
          <div
            className={
              toggle[1]
                ? "flexRow listItem flexWrap hidden"
                : "flexRow listItem flexWrap "
            }
          >
            {choosenData.trafficformat.map((listItem, listItemIndex) =>
              choosenData.traffic.map(
                (item) =>
                  item.choosen &&
                  item.TypeCode === listItem.TripTypeCode && (
                    <div
                      className={listItem.choosen ? "choosenTag" : "tag"}
                      key={listItem.TypeCode}
                      onClick={() => {
                        const newData = { ...choosenData };
                        newData.trafficformat[listItemIndex].choosen =
                          !newData.trafficformat[listItemIndex].choosen;
                        setChoosenData(newData);
                      }}
                    >
                      {listItem.TagName}
                    </div>
                  )
              )
            )}
          </div>
          {choosenData.traffic.some(
            (item) => item.TypeCode === "03" && item.choosen === true
          ) &&
            choosenData.traffic.some(
              (item) => item.TypeCode === "01" && item.choosen === true
            ) && (
              <div
                className="handleOption flexRow "
                onClick={() => {
                  const newData = [...toggle];
                  newData[1] = !newData[1];
                  setToggle(newData);
                }}
              >
                <p className="line">|</p>
                <p className="more">{toggle[1] ? "更多" : "收合"}</p>
                <img
                  src={more}
                  alt="more"
                  className={toggle[1] ? "iconMore" : "iconMore rotate"}
                />
              </div>
            )}
        </div>
      )}

      <div className="flexRow">
        <div className="title">產品規格</div>
        <div
          className={
            toggle[2]
              ? "flexRow listItem flexWrap hidden"
              : "flexRow listItem flexWrap "
          }
        >
          {choosenData.productFormat.map((listItem, listItemIndex) => (
            <div
              className={listItem.choosen ? "choosenTag" : "tag"}
              key={listItem.TypeCode}
              onClick={() => {
                const newData = { ...choosenData };
                newData.productFormat[listItemIndex].choosen =
                  !newData.productFormat[listItemIndex].choosen;
                setChoosenData(newData);
              }}
            >
              {listItem.TagName}
            </div>
          ))}
        </div>
        <div
          className="handleOption flexRow "
          onClick={() => {
            const newData = [...toggle];
            newData[2] = !newData[2];
            setToggle(newData);
          }}
        >
          <p className="line">|</p>
          <p className="more">{toggle[2] ? "更多" : "收合"}</p>
          <img
            src={more}
            alt="more"
            className={toggle[2] ? "iconMore" : "iconMore rotate"}
          />
        </div>
      </div>
      <div className="flexRow">
        <div className="title">行銷活動</div>
        <div className="flexRow listItem flexWrap">
          {choosenData.marcketing.map((listItem, listItemIndex) => (
            <div
              className={listItem.choosen ? "choosenTag" : "tag"}
              key={listItem.TypeCode}
              onClick={() => {
                const newData = { ...choosenData };
                newData.marcketing[listItemIndex].choosen =
                  !newData.marcketing[listItemIndex].choosen;
                setChoosenData(newData);
              }}
            >
              {listItem.TagName}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Chooser;
