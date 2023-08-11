import { useEffect, useRef, useState } from "react";
import CategoryList from "../CategoryList";
import "./style.scss";
import Ship from "./Ship";
import Bus from "./Bus";
import Railway from "./Railway";
import OpenButton from "./OpenButton";
import Tag from "./Tag";
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
  return productListArr;
}
const productList = productListMaker(0);
const marketingList = productListMaker(1);
const trafficList = productListMaker(2);

function Chooser() {
  const trafficContainer = useRef(null);
  const trafficContainer01 = useRef(null);
  const trafficContainer03 = useRef(null);
  const productContainer = useRef(null);
  const marketingContainer = useRef(null);

  const [showButton, setShowButton] = useState([]);
  const [toggle, setToggle] = useState([true, true, true, true, true]);
  const [choosenData, setChoosenData] = useState({
    traffic: TripTypeList,
    trafficformat: trafficList,
    productFormat: productList,
    marcketing: marketingList,
  });
  const [MEDIA, setMEDIA] = useState(window.innerWidth);
  function ifOverflow() {
    const trafficContainerRef = trafficContainer.current;
    const trafficRef01 = trafficContainer01.current;
    const trafficRef03 = trafficContainer03.current;
    const productRef = productContainer.current;
    const marketingRef = marketingContainer.current;
    if (showButton.length === 0) {
      const newShowButton = [
        trafficContainerRef
          ? trafficContainerRef.scrollHeight > trafficContainerRef.clientHeight
          : null,
        trafficRef01
          ? trafficRef01.scrollHeight > trafficRef01.clientHeight
          : null,
        trafficRef03
          ? trafficRef03.scrollHeight > trafficRef03.clientHeight
          : null,
        productRef.scrollHeight > productRef.clientHeight,
        marketingRef.scrollHeight > marketingRef.clientHeight,
      ];
      setShowButton(newShowButton);
    } else {
      const newShowButton = [...showButton];
      newShowButton[0] = trafficContainerRef
        ? trafficContainerRef.scrollHeight >
          trafficContainerRef.clientHeight + 1
        : null;
      newShowButton[1] = trafficRef01
        ? trafficRef01.scrollHeight > trafficRef01.clientHeight
        : null;
      newShowButton[2] = trafficRef03
        ? trafficRef03.scrollHeight > trafficRef03.clientHeight
        : null;
      newShowButton[4] = marketingRef.scrollHeight > marketingRef.clientHeight;
      setShowButton(newShowButton);
    }
  }
  function debounce(fun, delay = 200) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth === MEDIA) return;
      setMEDIA(window.innerWidth);
    };
    window.addEventListener("resize", debounce(handleResize));
    return () => {
      window.removeEventListener("resize", debounce(handleResize));
    };
  }, [MEDIA]);

  useEffect(() => {
    ifOverflow();
  }, [choosenData, MEDIA]);

  function handleClickTraffic(index) {
    const newData = { ...choosenData };
    if (choosenData.traffic[index].choosen) {
      newData.trafficformat
        .filter(
          (item) => item.TripTypeCode === choosenData.traffic[index].TypeCode
        )
        .forEach((item) => (item.choosen = false));
    }
    newData.traffic[index].choosen = !newData.traffic[index].choosen;
    setChoosenData(newData);
  }
  function handleClickTrafficformat01(index) {
    const newData = { ...choosenData };
    const shipData = newData.trafficformat.filter(
      (item) => item.TripTypeCode === "01"
    );
    shipData[index].choosen = !shipData[index].choosen;
    setChoosenData(newData);
  }
  function handleClickTrafficformat03(index) {
    const newData = { ...choosenData };
    const RailwayData = newData.trafficformat.filter(
      (item) => item.TripTypeCode === "03"
    );
    RailwayData[index].choosen = !RailwayData[index].choosen;

    setChoosenData(newData);
  }

  function handleClickProductformat(index) {
    const newData = { ...choosenData };
    newData.productFormat[index].choosen =
      !newData.productFormat[index].choosen;
    setChoosenData(newData);
  }
  function handleClickMarcketing(index) {
    const newData = { ...choosenData };
    newData.marcketing[index].choosen = !newData.marcketing[index].choosen;
    setChoosenData(newData);
  }

  return (
    <section className="chooser">
      <div className="flexRow">
        <div className="title">遊玩交通</div>
        <div
          ref={trafficContainer}
          className={
            toggle[0]
              ? "flexRow listItem flexWrap hidden "
              : "flexRow listItem flexWrap "
          }
        >
          {choosenData.traffic.map((listItem, listItemIndex) => (
            <Tag
              key={`traffic${listItem.TypeCode}`}
              listItem={listItem}
              type={"traffic"}
              handleOnClick={() => handleClickTraffic(listItemIndex)}
            />
          ))}
        </div>
        {showButton[0] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={0} />
        )}
      </div>
      {choosenData.traffic.some(
        (tripType) => tripType.TypeCode === "01" && tripType.choosen
      ) && (
        <div className="flexRow">
          <div className="title">郵輪規格</div>
          <div
            ref={trafficContainer01}
            className={
              toggle[1]
                ? "flexRow listItem flexWrap hidden "
                : "flexRow listItem flexWrap "
            }
          >
            {choosenData.trafficformat
              .filter((listItem) => listItem.TripTypeCode === "01")
              .map((listItem, listItemIndex) =>
                choosenData.traffic.map(
                  (item) =>
                    item.choosen &&
                    item.TypeCode === listItem.TripTypeCode && (
                      <Tag
                        key={`trafficformat${listItem.TypeCode}`}
                        listItem={listItem}
                        type={"trafficformat"}
                        handleOnClick={() =>
                          handleClickTrafficformat01(listItemIndex)
                        }
                      />
                    )
                )
              )}
          </div>
          {showButton[1] && (
            <OpenButton toggle={toggle} setToggle={setToggle} index={1} />
          )}
        </div>
      )}
      {choosenData.traffic.some(
        (tripType) => tripType.TypeCode === "03" && tripType.choosen
      ) && (
        <div className="flexRow">
          <div className="title">鐵道規格</div>
          <div
            ref={trafficContainer03}
            className={
              toggle[2]
                ? "flexRow listItem flexWrap hidden "
                : "flexRow listItem flexWrap "
            }
          >
            {choosenData.trafficformat
              .filter((listItem) => listItem.TripTypeCode === "03")
              .map((listItem, listItemIndex) =>
                choosenData.traffic.map(
                  (item) =>
                    item.choosen &&
                    item.TypeCode === listItem.TripTypeCode && (
                      <Tag
                        key={`trafficformat${listItem.TypeCode}`}
                        listItem={listItem}
                        type={"trafficformat"}
                        handleOnClick={() =>
                          handleClickTrafficformat03(listItemIndex)
                        }
                      />
                    )
                )
              )}
          </div>
          {showButton[2] && (
            <OpenButton toggle={toggle} setToggle={setToggle} index={2} />
          )}
        </div>
      )}

      <div className="flexRow">
        <div className="title">產品規格</div>
        <div
          ref={productContainer}
          className={
            toggle[3]
              ? "flexRow listItem flexWrap hidden "
              : "flexRow listItem flexWrap "
          }
        >
          {choosenData.productFormat.map((listItem, listItemIndex) => (
            <Tag
              key={`product${listItem.TagNo}`}
              listItem={listItem}
              type={"productformat"}
              handleOnClick={() => handleClickProductformat(listItemIndex)}
            />
          ))}
        </div>
        {showButton[3] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={3} />
        )}
      </div>
      <div className="flexRow">
        <div className="title">行銷活動</div>
        <div
          ref={marketingContainer}
          className={
            toggle[4]
              ? "flexRow listItem flexWrap hidden "
              : "flexRow listItem flexWrap "
          }
        >
          {choosenData.marcketing.map((listItem, listItemIndex) => (
            <Tag
              key={`marcketing-${listItem.TagNo}`}
              listItem={listItem}
              type={"marcketing"}
              handleOnClick={() => handleClickMarcketing(listItemIndex)}
            />
          ))}
        </div>
        {showButton[4] && (
          <OpenButton toggle={toggle} setToggle={setToggle} index={4} />
        )}
      </div>
    </section>
  );
}
export default Chooser;
