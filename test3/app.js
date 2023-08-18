$(function () {
  $(".price").on("click", function () {
    const clickedIndex = $(this).index();
    const rowIndex = $(this).parent().index();
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
  $(".rel-price").on("click", function () {
    const clickedIndex = $(this).index();
    if ($(this).hasClass("rel-clicked")) {
      $(this).toggleClass("rel-clicked");
      $(this).siblings(".rel-item").toggleClass("red");
      $(this).parents().find(".rel-item").eq(clickedIndex).toggleClass("red");
    } else {
      $(".rel")
        .children(".flexRow")
        .children()
        .each(function (_, item) {
          $(item).each(function (_, itemDiv) {
            $(itemDiv).children(".rel-clicked").removeClass("rel-clicked");
            $(itemDiv).find(".red").removeClass("red");
          });
        });
      $(this).toggleClass("rel-clicked");
      $(this).siblings(".rel-item").toggleClass("red");
      $(this).parents().find(".rel-item").eq(clickedIndex).toggleClass("red");
    }
  });

  $(".frzTable.default").frzTable({
    count: {
      slide: 2,
      show: 4,
    },
    speed: 0.3,
    whenClick: function (count, target) {
      let slide = this.count.slide;
      let show = this.count.show;
      let speed = this.speed * 1000;

      let biggestIndex = $(".frzTable.default")
        .children(".flexRow")
        .children("div:last")
        .index();
      //按鈕顯示

      if (biggestIndex - (count + show - 2) <= 0) {
        $(".frzTable.default").find(".stickyContainer.right").hide();
      } else {
        $(".frzTable.default").find(".stickyContainer.right").show();
      }
      if (count >= slide) {
        $(".frzTable.default").find(".stickyContainer.left").show();
      } else {
        $(".frzTable.default").find(".stickyContainer.left").hide();
      }
      let position;
      if ($(target).hasClass("right")) {
        position = `-=${100 * slide}px`;
      }
      if ($(target).hasClass("left")) {
        position = `+=${100 * slide}px`;
      }
      $(".frzTable.default").children(".flexRow").animate(
        {
          left: position,
        },
        speed
      );
    },
    widthShow: function (show) {
      $(".frzTable").find(".stickyContainer.left").hide();
      if (innerWidth < 1000) {
        $(".default").css({ width: `${100 * show}` });
        $(".frzTable")
          .children(".flexRow")
          .addClass("absolute")
          .css({ left: "100px" });
      }
    },
  });
  $(".frzTable.rel").frzTable({
    count: {
      slide: 1,
      show: 3,
    },
    speed: 0.3,
    whenClick: function (count, target) {
      let slide = this.count.slide;
      let show = this.count.show;
      let speed = this.speed * 1000;

      let biggestIndex = $(".frzTable.rel")
        .children(".flexRow")
        .children("div:last")
        .index();

      //按鈕顯示
      if (biggestIndex - (count + show - 2) <= 0) {
        $(".frzTable.rel").find(".stickyContainer.rel-right").hide();
      } else {
        $(".frzTable.rel").find(".stickyContainer.rel-right").show();
      }
      if (count >= slide) {
        $(".frzTable.rel").find(".stickyContainer.rel-left").show();
      } else {
        $(".frzTable.rel").find(".stickyContainer.rel-left").hide();
      }
      let position;
      if ($(target).hasClass("rel-right")) {
        position = `-=${133 * slide}px`;
      }
      if ($(target).hasClass("rel-left")) {
        position = `+=${133 * slide}px`;
      }
      $(".frzTable.rel").children(".flexRow").addClass("absolute").animate(
        {
          left: position,
        },
        speed
      );
    },
    widthShow: function (show) {
      $(".frzTable.rel").find(".stickyContainer.left").hide();
      if (innerWidth < 1000) {
        $(".rel").css({ width: `${133 * show}px` });
        $(".frzTable.rel")
          .children(".flexRow")
          .addClass("absolute")
          .css({ left: "133px" });
      } else {
        $(".rel").css({ width: "" });
      }
    },
  });
});
