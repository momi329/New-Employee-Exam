function debounce(func, delay = 50) {
  let timer = null;
  count = 0;
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
  window.addEventListener(
    "resize",
    debounce(() => {
      arg.widthShow();
      count = 0;
      console.log("count歸零", count);
    })
  );
  return $(this)
    .children("span")
    .click(function () {
      if ($(this).hasClass("right") || $(this).hasClass("rel-right")) {
        count += arg.count.slide;
      } else {
        count -= arg.count.slide;
      }

      arg.whenClick(count, this);
    });
};
