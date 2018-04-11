var input = document.getElementsByTagName("input")[0];
var btns = document.getElementsByTagName("button");
var container = document.getElementById("container");

//跨浏览器事件绑定
function addEventHandler (ele, type, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, handler);
  } else {
    ele["on" + type] = handler;
  }
}

//获取和检测输入数据
function testValue () {
  var value = parseInt(input.value);
  if (!(/^[0-9]+$/.test(value) && value > 10 && value < 100)) {
    alert("请输入10~100的正整数！");
    return false;
  }
  return value;
}

//以下四个函数为对应的button事件函数
function leftIn () {
  var len = container.childElementCount;
  var value = testValue();
  if (!value) {
    return;
  }
  var newEle = document.createElement("li");
  var oldEle = container.firstElementChild;
  newEle.style.height = value + "px";
  if (len >= 60) {
    alert("队列已满！");
    return;
  } else {
    container.insertBefore(newEle, oldEle);
  }
  //新添加的li元素绑定delEle函数
  addEventHandler(newEle, "click", delEle);
}

function rightIn () {
  var len = container.childElementCount;
  var value = testValue();
  if (!value) {
    return;
  }
  if (len >= 60) {
    alert("队列已满！");
    return;
  }
  var newEle = document.createElement("li");
  newEle.style.height = value + "px";
  container.appendChild(newEle);
  //新添加的li元素绑定delEle函数
  addEventHandler(newEle, "click", delEle);
}

function leftOut () {
  var oldEle = container.firstElementChild;
  if (!oldEle) {
    alert("队列已空！");
    return;
  } else {
    container.removeChild(oldEle);
  }
}

function rightOut () {
  var oldEle = container.lastElementChild;
  if (!oldEle) {
    alert("队列已空！");
    return;
  } else {
    container.removeChild(oldEle);
  }
}

function delEle (event) {
  var oldEle = event.target;
  container.removeChild(oldEle);
}

function bubbleSort () {
  var eles = container.children;
  var len = eles.length;
  var i = len - 1;
  var j = 0;
  var timer = null;
  timer = setInterval(function () {
    if (i < 1) {
      clearInterval(timer);
    }
    if (j == i) {
      --i;
      j = 0;
    }
    if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
      var temp = eles[j].offsetHeight;
      eles[j].style.height = eles[j+1].offsetHeight + "px";
      eles[j+1].style.height = temp + "px";
    }
    ++j;
  }, 100);
}

//为button绑定事件函数
addEventHandler(btns[0], "click", leftIn);
addEventHandler(btns[1], "click", rightIn);
addEventHandler(btns[2], "click", leftOut);
addEventHandler(btns[3], "click", rightOut);
addEventHandler(btns[4], "click", bubbleSort);

