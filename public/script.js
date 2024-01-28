document.getElementById("toggleButton").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");

  if (sidebar.style.left === "-250px") {
    sidebar.style.left = "0";
    mainContainer.style.marginLeft = "250px";
  } else {
    sidebar.style.left = "-250px";
    mainContainer.style.marginLeft = "0";
  }
});
document.querySelectorAll(".sidebar a").forEach(function (element) {
  element.addEventListener("click", function () {
    // Reset the background color of all sidebar elements
    document.querySelectorAll(".sidebar a").forEach(function (el) {
      el.style.color = "";
    });

    // Change the background color of the clicked sidebar element
    this.style.color = "rgb(25, 118, 210)";
  });
});
