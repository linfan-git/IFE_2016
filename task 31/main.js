var inputs = document.getElementsByTagName("input");
var selects = document.getElementsByTagName("select");
var inSchool = document.getElementById("inschool");
var outSchool = document.getElementById("outschool");

inputs[0].onchange = function () {
  inSchool.style.display = "block";
  outSchool.style.display = "none";
}

inputs[1].onchange = function () {
  inSchool.style.display = "none";
  outSchool.style.display = "block";
}

selects[0].onchange = function () {
  var data = {
    bj: ["北京大学", "清华大学"],
    fz: ["福州大学", "集美大学"]
  };
  var selected = selects[0].options[selects[0].selectedIndex].value;
  selects[1].innerHTML = "";
  for (var i = 0; i < data[selected].length; i++) {
    var option = document.createElement("option");
    option.value = data[selected][i];
    option.innerHTML = data[selected][i];
    selects[1].appendChild(option);
  }
}
