$(document).ready(function () {
  function removeAllsidebarToggleClass() {
    $("#sidebar-toggle-hide").removeClass("d-md-inline");
    $("#sidebar-toggle-hide").removeClass("d-none");
    $("#sidebar-toggle-show").removeClass("d-inline");
    $("#sidebar-toggle-show").removeClass("d-md-none");
  }


  $("#sidebar-toggle-hide").click(function () {
    $("#sidebar").fadeOut(300);
    $("#main-body").animate({ width: "100%" }, 300);
    setTimeout(function () {
      removeAllsidebarToggleClass();
      $("#sidebar-toggle-hide").addClass("d-none");
      $("#sidebar-toggle-show").removeClass("d-none");
    }, 300);
  });
  $("#sidebar-toggle-show").click(function () {
    $("#sidebar").fadeIn(300);
    setTimeout(function () {
      removeAllsidebarToggleClass();
      $("#sidebar-toggle-hide").removeClass("d-none");
      $("#sidebar-toggle-show").addClass("d-none");
    }, 300);
  });

  $("#menu-toggle").click(function () {
    $("#body-header").toggle(300);
  });
  // Login show-Hide
  $("#header-profile-toggle").click(function () {
    $("#header-profile").toggle(300);
  });

  //  sidebar-group-link-toggle
  $(".sidebar-group-link").click(function () {
    $(".sidebar-group-link").removeClass("sidebar-group-link-active");
    $(".sidebar-group-link")
      .children(".sidebar-dropdown-toggle")
      .children(".angle")
      .removeClass("fa-angle-down");
    $(".sidebar-group-link")
      .children(".sidebar-dropdown-toggle")
      .children(".angle")
      .addClass(".fa-angle-right");

    $(this).addClass("sidebar-group-link-active");
    $(this)
      .children(".sidebar-dropdown-toggle")
      .children(".angle")
      .addClass(".fa-angle-down");
    $(this)
      .children(".sidebar-dropdown-toggle")
      .children(".angle")
      .removeClass(".fa-angle-right");
  });



  var inputLeft = document.getElementById("input-left");
  var inputRight = document.getElementById("input-right");

  var thumbLeft = document.querySelector(".slider > .thumb.left");
  var thumbRight = document.querySelector(".slider > .thumb.right");
  var range = document.querySelector(".slider > .range");

  function setLeftValue() {
    var _this = inputLeft,
      min = parseInt(_this.min),
      max = parseInt(_this.max);

    _this.value = Math.min(
      parseInt(_this.value),
      parseInt(inputRight.value) - 1
    );

    var percent = ((_this.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
  }
  setLeftValue();

  function setRightValue() {
    var _this = inputRight,
      min = parseInt(_this.min),
      max = parseInt(_this.max);

    _this.value = Math.max(
      parseInt(_this.value),
      parseInt(inputLeft.value) + 1
    );

    var percent = ((_this.value - min) / (max - min)) * 100;

    thumbRight.style.right = 100 - percent + "%";
    range.style.right = 100 - percent + "%";
  }
  setRightValue();

  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);

  inputLeft.addEventListener("mouseover", function () {
    thumbLeft.classList.add("hover");
  });
  inputLeft.addEventListener("mouseout", function () {
    thumbLeft.classList.remove("hover");
  });
  inputLeft.addEventListener("mousedown", function () {
    thumbLeft.classList.add("active");
  });
  inputLeft.addEventListener("mouseup", function () {
    thumbLeft.classList.remove("active");
  });

  inputRight.addEventListener("mouseover", function () {
    thumbRight.classList.add("hover");
  });
  inputRight.addEventListener("mouseout", function () {
    thumbRight.classList.remove("hover");
  });
  inputRight.addEventListener("mousedown", function () {
    thumbRight.classList.add("active");
  });
  inputRight.addEventListener("mouseup", function () {
    thumbRight.classList.remove("active");
  });
});
