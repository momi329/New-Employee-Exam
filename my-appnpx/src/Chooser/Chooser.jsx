import { useEffect, useRef, useState } from "react";
import CategoryList from "../CategoryList";
import Ship from "./Ship";
import Bus from "./Bus";
import Railway from "./Railway";
import "./style.scss";
import OpenButton from "./OpenButton";
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
  const trafficContainer = useRef(null);
  const productContainer = useRef(null);
  const marketingContainer = useRef(null);

  const [showButton, setShowButton] = useState([]);
  const [toggle, setToggle] = useState([null, true, true, null]);
  const [choosenData, setChoosenData] = useState({
    traffic: TripTypeList,
    trafficformat: trafficList,
    productFormat: productList,
    marcketing: marketingList,
  });
  function ifOverflow() {
    const trafficRef = trafficContainer.current;
    const productRef = productContainer.current;
    const marketingRef = marketingContainer.current;
    if (showButton.length === 0) {
      const newShowButton = [
        null,
        trafficRef ? trafficRef.scrollHeight > trafficRef.clientHeight : null,
        productRef.scrollHeight > productRef.clientHeight,
        marketingRef.scrollHeight > marketingRef.clientHeight,
      ];
      setShowButton(newShowButton);
    } else {
      const newShowButton = [...showButton];
      newShowButton[1] = trafficRef
        ? trafficRef.scrollHeight > trafficRef.clientHeight
        : null;
      setShowButton(newShowButton);
    }
  }
  useEffect(() => {
    ifOverflow();
  }, [choosenData]);

  return (
    <section className="chooser">
      <div className="flexRow">
        <div className="title">遊玩交通</div>
        <div className="flexRow listItem ">
          {choosenData.traffic.map((listItem, listItemIndex) => (
            <div
              className={
                listItem.choosen
                  ? "choosenTag flexRow alignCenter"
                  : "flexRow alignCenter tag"
              }
              key={`traffic${listItem.TypeCode}`}
              onClick={() => {
                const newData = { ...choosenData };
                if (choosenData.traffic[listItemIndex].choosen) {
                  newData.trafficformat.forEach(
                    (item) => (item.choosen = false)
                  );
                }
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
        {showButton[0] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={0} />
        )}
      </div>
      {choosenData.traffic.some(
        (tripType) =>
          (tripType.TypeCode === "01" && tripType.choosen) ||
          (tripType.TypeCode === "03" && tripType.choosen)
      ) && (
        <div className="flexRow">
          <div className="title">鐵道規格</div>
          <div
            ref={trafficContainer}
            className={
              toggle[1]
                ? "flexRow listItem flexWrap hidden "
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
                      key={`trafficformat${listItem.TypeCode}`}
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
          {showButton[1] && (
            <OpenButton toggle={toggle} setToggle={setToggle} index={1} />
          )}
        </div>
      )}

      <div className="flexRow">
        <div className="title">產品規格</div>
        <div
          ref={productContainer}
          className={
            toggle[2]
              ? "flexRow listItem flexWrap hidden "
              : "flexRow listItem flexWrap "
          }
        >
          {choosenData.productFormat.map((listItem, listItemIndex) => (
            <div
              className={listItem.choosen ? "choosenTag" : "tag"}
              key={`product${listItem.TagNo}`}
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
        {showButton[2] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={2} />
        )}
      </div>
      <div className="flexRow">
        <div className="title">行銷活動</div>
        <div ref={marketingContainer} className="flexRow listItem flexWrap ">
          {choosenData.marcketing.map((listItem, listItemIndex) => (
            <div
              className={listItem.choosen ? "choosenTag" : "tag"}
              key={`marcketing-${listItem.TagNo}`}
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
        {showButton[3] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={3} />
        )}
      </div>
    </section>
  );
}
export default Chooser;
