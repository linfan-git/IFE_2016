(function () {
  var date = new Date();
  var calendar = document.getElementById('calendar');
  var datePicker = document.getElementById('date-picker');
  var curDate = document.querySelector('.cur-date');
  var calendarBody = document.querySelector('.calendar-body');
  var prevBtn = document.querySelector('.prev');
  var nextBtn = document.querySelector('.next');

  function toDateText (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '年' + m + '月' + d + '日';
  }

  function render () {
    var dat = new Date(date);

    //获取第一个日期
    dat.setDate(1);
    dat.setDate(dat.getDate() - dat.getDay());

    calendarBody.innerHTML = '<tr>\n' +
      '                    <th>Su</th>\n' +
      '                    <th>Mo</th>\n' +
      '                    <th>Tu</th>\n' +
      '                    <th>We</th>\n' +
      '                    <th>Th</th>\n' +
      '                    <th>Fr</th>\n' +
      '                    <th>Sa</th>\n' +
      '                    </tr>';
    for (var i = 0; i < 6; i++) {
      var tr = document.createElement('tr');

      for (var j = 0; j < 7; j++) {
        var td = document.createElement('td');
        if (j === 0 || j === 6) {
          td.className = 'week';
        }
        if (dat.getMonth() !== date.getMonth()) {
          td.style.color = 'lightgray';
        }
        td.innerHTML = dat.getDate();
        tr.appendChild(td);
        dat.setDate(dat.getDate() + 1);
      }

      calendarBody.appendChild(tr);
    }

    datePicker.value = curDate.innerHTML = toDateText(dat);
  }

  function prevMonth () {
    date.setMonth(date.getMonth() - 1);
    render();
  }

  function nextMonth () {
    date.setMonth(date.getMonth() + 1);
    render();
  }

  datePicker.onclick = function () {
    calendar.style.display = 'block';
    render();
  };
  calendar.onclick = function (event) {
    if (event.target.tagName === 'TD') {
      var dat = new Date(date);
      dat.setDate(parseInt(event.target.innerHTML));
      event.target.style.backgroundColor = '#20b89e';
      datePicker.value = curDate.innerHTML = toDateText(dat);
    }
  };
  prevBtn.onclick = prevMonth;
  nextBtn.onclick = nextMonth;
})()