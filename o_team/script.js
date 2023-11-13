$.getJSON("./shop_information.json", function (json) {
  var tbody = document.createElement("tbody");

  // jsonからテーブルを作成
  for (var i = 0; i < json.length; i++) {
    var tr = document.createElement("tr");
    var j = 0;
    for (key in json[0]) {
      var td = document.createElement("td");
      // 偶数行の背景色のみ変更
      if (j % 2 == 0) {
        td.style.backgroundColor = "#ECF4D9";
      }
      j += 1;
      td.textContent = json[i][key];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  var table = document.getElementById("shop_info_table");

  table.appendChild(tbody);
  $("#shop_info_table").tablesorter();
});
