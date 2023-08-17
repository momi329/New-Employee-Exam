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

  $(".frzTable").frzTable({
    count: {
      slide: 2,
      show: 4,
    },
    speed: 0.3,
    whenClick: function (count, target) {
      let slide = this.count.slide;
      let show = this.count.show;
      let speed = this.speed * 1000;

      let biggestIndex = $(".frzTable")
        .children(".flexRow")
        .children("div:last")
        .index();

      //按鈕顯示

      if (biggestIndex - (count + show - 2) <= 0) {
        $(".frzTable").find(".stickyContainer.right").hide();
      } else {
        $(".frzTable").find(".stickyContainer.right").show();
      }
      if (count >= slide) {
        $(".frzTable").find(".stickyContainer.left").show();
      } else {
        $(".frzTable").find(".stickyContainer.left").hide();
      }

      $(".frzTable")
        .children(".flexRow")
        .children()
        .each(function (index, item) {
          if ($(target).hasClass("left")) {
            $(".frzTable").addClass("justifyBetween");
          } else {
            $(".frzTable").removeClass("justifyBetween");
          }
          //appear
          if (index >= count && index <= count + show - 2) {
            if ($(target).hasClass("left") && count + (show - 2) !== index) {
              console.log("!", index, item);
              $(item)
                // .css({ marginLeft: "-100px" })
                .removeClass("disappear")
                .addClass("appear");
            } else {
              $(item)
                .css({ margin: 0 })
                .removeClass("disappear")
                .addClass("appear");
            }
          }
          //小於(slide)
          if (index < count) {
            if (count - index <= slide) {
              if ($(target).hasClass("right")) {
                $(item)
                  .css({ margin: "0", right: "0" })
                  .animate({ marginLeft: "-100px" }, speed);
                setTimeout(() => {
                  $(item)
                    .removeClass("appear")
                    .addClass("disappear")
                    .css({ margin: "0" });
                }, 500);
              }
            } else {
              //小於
              $(item).removeClass("appear").addClass("disappear");
            }
          }
          //大於(slide)
          if (index > count + show - 2) {
            if (count + show - 2 + slide >= index) {
              $(item).removeClass("appear").addClass("disappear");
            } else {
              //大於消失
              $(item).removeClass("appear").addClass("disappear");
            }
          }
        });
    },
    widthShow: function (show) {
      $(".frzTable").find(".stickyContainer.left").hide();
      if (innerWidth < 1000) {
        $(".default").css({ width: `${100 * show}` });
        $(".frzTable")
          .children(".flexRow")
          .children()
          .each(function (index, item) {
            if (index > show - 2) {
              $(item).addClass("disappear");
            }
          });
      } else {
        $(".frzTable")
          .children(".flexRow")
          .children()
          .each(function (index, item) {
            $(item).addClass("appear");
          });
      }
    },
  });
});
