const toggleButton = document.getElementById("toggleButton");
const myDiv = document.getElementById("myDiv");

toggleButton.addEventListener("click", function () {
  myDiv.classList.toggle("expanded");
});
