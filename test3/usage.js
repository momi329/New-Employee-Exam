function debounce(func, delay = 500) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
}
$.fn.frzTable = function (arg) {
  let count = 0;
  arg.widthShow(arg.count.show);
  window.addEventListener("resize", debounce(arg.widthShow));
  return $(this)
    .children("span")
    .click(function () {
      if ($(this).hasClass("right")) {
        count += arg.count.slide;
      } else {
        count -= arg.count.slide;
      }
      arg.whenClick(count, this);
    });
};

// $(function () {
//   $(".frzTable .default").frzTable({
//     count: {
//       // M版時每次點擊往前往後移動幾格儲存格
//       slide: 1, // [number]
//       // M版時一個畫面show幾格儲存格
//       show: 4, // [number]
//     },
//     // 設定花多久時間移動完成
//     speed: 0.3, // [number]
//     // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
//     whenClick: function () {
//       console.log($(this));
//     },
//   });
//   $(".frzTable.rel").frzTable({
//     count: {
//       slide: 1,
//       show: 2,
//     },
//     whenClick: function ($element) {
//       // console.log($element)
//     },
//   });
// });
