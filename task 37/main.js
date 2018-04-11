//获取元素对象
function g (ele) {
  return document.getElementById(ele);
}

//点击遮罩和关闭按钮时，使遮罩和登录框不可见
g("mask").onclick = g("close-btn").onclick = function () {
  g("mask").style.display = "none";
  g("login-box").style.display = "none";
}

//点击“登录”链接时，使遮罩和登录框可见
g("login-link").onclick = function () {
  g("mask").style.display = "block";
  g("login-box").style.display = "block";
}

//自动居中
function autoCenter (ele) {
  var bodyW = document.documentElement.clientWidth;
  var bodyH = document.documentElement.clientHeight;
  var eleW = ele.offsetWidth;
  var eleH = ele.offsetHeight;

  ele.style.left = (bodyW - eleW) / 2 + "px";
  ele.style.top = (bodyH - eleH) / 2 + "px";
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDraging = false;

g("login-box-header").addEventListener("mousedown", function (e) {
  mouseOffsetX = e.pageX - g("login-box").offsetLeft;
  mouseOffsetY = e.pageY - g("login-box").offsetTop;
  isDraging = true;
});

document.onmousemove = function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  var moveX = 0;
  var moveY = 0;
  if (isDraging) {
    moveX = mouseX - mouseOffsetX;
    moveY = mouseY - mouseOffsetY;

    //获取页面宽高度
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    //获取浮出层宽高度
    var loginBoxWidth = g("login-box").offsetWidth;
    var loginBoxHeight = g("login-box").offsetHeight;

    //限制登录框不超出页面
    var maxMoveX = pageWidth - loginBoxWidth;
    var maxMoveY = pageHeight - loginBoxHeight;
    moveX = Math.min(maxMoveX, Math.max(0, moveX));
    moveY = Math.min(maxMoveY, Math.max(0, moveY));

    g("login-box").style.left = moveX + "px";
    g("login-box").style.top = moveY + "px";
  }
};

var mousePanel, mouseCtrl, mouseType;
var moving = 0, mouseStartX = 0, mouseStartY = 0;

function onMouseDown (e, panel, ctrl, type) {
  mouseStartX = e.pageX - ctrl.offsetLeft;
  mouseStartY = e.pageY - ctrl.offsetTop;

  mousePanel = panel;
  mouseCtrl = ctrl;
  mouseType = type;

  moving = setInterval(onMove, 10);
}

function onMove () {
  if (moving) {
    var toX = mouseX - mouseStartX;
    var toY = mouseY - mouseStartY;
    //限定浮出层最大宽高度
    var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft;
    var maxToY = document.documentElement.clientHeight - mousePanel.offsetTop;
    toX = Math.min(maxToX, Math.max(300, toX));
    toY = Math.min(maxToY, Math.max(200, toY));

    switch (mouseType) {
      case "r":
        mousePanel.style.width = toX + "px";
        break;
      case "b":
        mousePanel.style.height = toY + "px";
        break;
      case "rb":
        mousePanel.style.width = toX + "px";
        mousePanel.style.height = toY + "px";
        break;
    }
  }
}

document.onmouseup = function () {
  isDraging = false;
  clearInterval(moving);
  moving = 0;
};

function resizable (el) {
  var panel = el;
  var rightBox = document.createElement("div");
  var bottomBox = document.createElement("div");
  var rightBottomBox = document.createElement("div");

  rightBox.className = "resizable-right";
  bottomBox.className = "resizable-bottom";
  rightBottomBox.className = "resizable-right-bottom";

  panel.appendChild(rightBox);
  panel.appendChild(bottomBox);
  panel.appendChild(rightBottomBox);

  rightBox.addEventListener("mousedown", function (e) {
    onMouseDown(e, panel, rightBox, "r");
  });
  bottomBox.addEventListener("mousedown", function (e) {
    onMouseDown(e, panel, bottomBox, "b");
  });
  rightBottomBox.addEventListener("mousedown", function (e) {
    onMouseDown(e, panel, rightBottomBox, "rb");
  });
}

window.onload = window.onresize = function () {
  autoCenter(g("login-box"));
  resizable(g("login-box"));
};






