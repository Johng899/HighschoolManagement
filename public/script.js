document.getElementById("toggleButton").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");
  const footer = document.querySelector(".footer-content");

  if (sidebar.style.left === "-250px") {
    sidebar.style.left = "0";
    mainContainer.style.marginLeft = "250px";
    footer.style.marginLeft = "250px";
  } else {
    sidebar.style.left = "-250px";
    footer.style.marginLeft = "0px";
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

// for student subject view
const tableViewButton = document.getElementById("tableViewButton");
const chartViewButton = document.getElementById("chartViewButton");
const tableView = document.querySelector(".tableView");
const chartView = document.querySelector(".chartView");
chartView.style.display = "none";

tableViewButton.addEventListener("click", showTableView);
chartViewButton.addEventListener("click", showChartView);

function showTableView() {
  tableView.style.display = "table";
  chartView.style.display = "none";
}

function showChartView() {
  tableView.style.display = "none";
  chartView.style.display = "block";
}

//Icon for Account
