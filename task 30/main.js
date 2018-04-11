//跨浏览器事件绑定
function addEventHandler (ele, type, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, handler);
  } else {
    ele['on' + type] = handler;
  }
}

var inputs = document.getElementsByTagName("input");
var hints = document.getElementsByClassName("hint");
var submit = document.getElementById("submit");

//提示文本
var hintText=[{hint:"必填，长度为4~16位字符",right:"名称格式正确",wrong:"名称格式有误",isPassed:false},
  {hint:"必填，长度为4~16位字符,包含字母和数字",right:"密码可用",wrong:"密码不可用",isPassed:false},
  {hint:"必填，必须与密码相同",right:"密码输入一致",wrong:"密码输入不一致",isPassed:false},
  {hint:"填写正确的邮箱格式",right:"邮箱格式正确",wrong:"邮箱格式错误",isPassed:false},
  {hint:"必填，长度为4~16位字符",right:"手机格式正确",wrong:"手机格式错误",isPassed:false}];

//事件处理函数
function validate (id) {
  var value = inputs[id].value;
  var flag = false;
  switch (id) {
    case 0:
      flag = /^[a-zA-Z0-9]{4,16}$/.test(value.replace(/[\u2E80-\uFE4F]/g, "nn"));
      break;
    case 1:
      flag = /^[\u0021-\u007E]{4,16}$/.test(value);
      break;
    case 2:
      flag = inputs[1].value == value;
      break;
    case 3:
      flag = /^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+$/.test(value);
      break;
    case 4:
      flag = /^[1][0-9]{10}$/.test(value);
      break;
  }
  if (flag) {
    inputs[id].style.borderColor = "lightgreen";
    hints[id].lastElementChild.innerHTML = hintText[id].right;
    hintText[id].isPassed = true;
  } else {
    inputs[id].style.borderColor = "red";
    hints[id].lastElementChild.innerHTML = hintText[id].wrong;
    hintText[id].isPassed = false;
  }
}

//事件绑定
/*for (var i = 0; i < inputs.length; i++) {
  addEventHandler(inputs[i], "focus", function (num) {
    return function () {
      hints[num].style.display = "table-row";
    };
  }(i));
  addEventHandler(inputs[i], "blur", function (num) {
    return function () {
      validate(num);
    };
  }(i));
}*/
[].forEach.call(inputs, function (item, index) {
  addEventHandler(item, "focus", function () {
    hints[index].style.display = "table-row";
  });
  addEventHandler(item, "blur", function () {
    validate(index);
  });
});
addEventHandler(submit, "click", function () {
  [0,1,2,3,4].forEach(function (item) {
    validate(item);
  });
  var flag = hintText.every(function (item) {
    return item.isPassed;
  });
  if (flag) {
    alert("提交成功！");
  } else {
    alert("提交失败！");
  }
});

