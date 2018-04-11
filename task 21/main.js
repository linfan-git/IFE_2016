//跨浏览器事件绑定
function addEventHandler (ele, type, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handler, false)
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, handler)
  } else {
    ele['on' + type] = handler
  }
}

/**
 * 创建可复用对象给tag和hobby
 * @param {string} input 输入框id
 * @param {string} output 输出框的class名
 * @param {string} button 按钮的id，可选
 */
function Tag (input, output, button) {
  //私有属性
  var number;
  //特权方法
  this.getNumber = function () {
    return number;
  }
  this.setNumber = function (newNumber) {
    number = newNumber;
  }
  //公有属性
  this.input = document.getElementById(input);
  this.output = document.getElementsByClassName(output)[0];
  this.button = document.getElementById(button);
  //公有方法
  this.getData = function () {
    switch (input) {
      case "tag":
        var value = this.input.value.match(/^[^,，\s]*/)[0];
        break;
      case "hobby":
      default:
        var value = this.input.value.trim().split(/\n|,|，|、|\s|\r|\t/);
    }
    return value;
  };
  this.render = function (value) {
    if (value == "") {
      return;
    }
    var li = document.createElement("li");
    li.textContent = value;
    this.output.appendChild(li);
    number++;
  };
  //构造器
  this.setNumber(0);
  //初始化
  this.button ? this.init("buttonEvent") : this.init("keyEvent");
}

/**
 * 构造原型方法
 */
Tag.prototype = {
  /**
   * 检测数据是否重复
   * @param {String} data 输入的数据
   * @return {Boolean} 数据是否重复
   */
  repeatData: function (data) {
    for (var i = 0; i < this.output.children.length; i++) {
      if (this.output.children[i].textContent.localeCompare(data) === 0) {
        this.input.value = "";
        // this.setNumber(this.output.children.length);
        return true;
      }
    }
  },

  /**
   * 删除特定的数据
   * @param {Object} ele 被删除的元素
   */
  delData: function (ele) {
    this.output.removeChild(ele);
    this.setNumber(this.output.children.length);
  },

  /**
   * 初始化
   * @param {String} type 判断是否需要用按钮使用不同的初始化方式
   */
  init: function (type) {
    var self = this;
    addEventHandler(self.output, "mouseover", function (event) {
      event.target.textContent = "删除：" + event.target.textContent;
    });
    addEventHandler(self.output, "mouseout", function (event) {
      event.target.textContent = event.target.textContent.replace(/删除：/, "");
    });
    addEventHandler(self.output, "click", function (event) {
      self.delData(event.target);
    });
    switch (type) {
      case "keyEvent":
        addEventHandler(self.input, "keyup", function (event) {
          if (/(,|，|\s)$/.test(self.input.value) || event.keyCode === 13) {
            self.repeatData(self.getData().trim()) || self.render(self.getData().trim());
            self.input.value = '';
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
        });
        break;
      case "buttonEvent":
        addEventHandler(self.button, "click", function (event) {
          for (var i = 0; i < self.getData().length; i++) {
            self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
          self.input.value = '';
        });
        break;
    }
  }
};

//实例化
var tag = new Tag("tag", "tagContainer");
var hobby = new Tag("hobby", "hobbyContainer", "confirm");




