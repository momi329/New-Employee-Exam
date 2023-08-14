$(function () {
  $(".price").on("click", function () {
    const clickedIndex = $(this).index();
    const rowIndex = $(this).parent().index() - 1;
    if ($(this).hasClass("clicked")) {
      $(this).toggleClass("clicked");
      $.each(
        $(this).parents("section").find(`.form-row`),
        function (index, item) {
          if (rowIndex !== index) {
            $(item).find(`div:eq(${clickedIndex})`).toggleClass("background");
          }
        }
      );
    } else {
      $.each($("section"), function (index, item) {
        $.each(
          $(item).children("div").find(".clicked"),
          function (divIndex, itemDiv) {
            $(itemDiv).removeClass("clicked");
          }
        );
        $.each(
          $(item).children("div").find(".background"),
          function (divIndex, itemDiv) {
            $(itemDiv).removeClass("background");
          }
        );
      });
      $(this).toggleClass("clicked");
      $.each(
        $(this).parents("section").find(`.form-row`),
        function (index, item) {
          if (rowIndex !== index) {
            $(item).find(`div:eq(${clickedIndex})`).toggleClass("background");
          }
        }
      );
    }
    $(this).siblings(".price").toggleClass("background");
  });
});
