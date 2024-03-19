// 変数定義
const point = [0, 1, 2];
const holidays = getHolidays();

// 初期化処理
// テーブルを作成する
for (var i = 0; i < holidays.length; i++) {
  var tr = document.createElement("tr");
  tr.setAttribute("id", "checkSelect");
  var td = document.createElement("td");
  td.textContent = holidays[i];
  tr.appendChild(td);
  document.getElementById("days").appendChild(tr);

  for (var j = 0; j < point.length; j++) {
    var td = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("class", "radioButton")
    input.setAttribute("id", "day_" + i);
    input.setAttribute("name", "day_" + i);
    input.setAttribute("value", point[j]);
    input.setAttribute("onclick", "checkedProcess()");
    td.appendChild(input);
    tr.appendChild(td);
  }
}

// cssを最後に読み込ませる(element追加によってcssを読み込まない事象が発生したため)
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
document.head.appendChild(link);

/**
 * フォーマットされた日付と曜日を返却する
 * 
 * @returns YYYY年MM月DD日 W曜日
 */
function getHolidays() {
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();
  let mm = m + 1;
  // 末日までの日数
  let d = new Date(y, mm, 0).getDate();

  let showDay = [];
  for (let i = 1; i <= d; i++) {
    // [i]日が一週間の中で何番目かを取得。実行結果は0から数えた番号で返される。
    let w = new Date(y, m, [i]).getDay();

    let ww = ["日", "月", "火", "水", "木", "金", "土"];

    // [i]日の曜日が、日曜と土曜の時だけ書き出す
    if (w === 0 || w === 6) {
      let day = i.toString().padStart(2, "0");
      showDay.push(y + "年" + mm + "月" + day + "日\t" + ww[w] + "曜日");
    }
  }

  return showDay;
}
/**
 * ラジオボタンが全て押された場合に送信ボタンを表示に切り替える
 */
function checkedProcess() {
  let send = document.getElementById("send");

  if (isAllCheck()) {
    send.style.display = 'block';
  } else {
    send.style.display = 'none';
  }
}

/**
 * ラジオボタンに全てチェックがついているかの判定を行う
 * 
 * @returns チェック結果 boolean
 */
function isAllCheck() {
  let days = document.form.elements.length / point.length;
  for (let i = 0; i < days; i++) {
    let targetDay = "day_" + i;
    let checkedValue = getCheckedValue(document.form.elements[targetDay]);
    // 1つでもnullが返却される場合はfalseを返す
    if (checkedValue == null) return false ;
  }
  return true
}

/**
 * targetElementのチェックがついているインデックスを取得する
 * チェックが無い場合はnullを返却する
 * 
 * @param targetElement Array
 * @returns チェック有りの値 Int?
 */
function getCheckedValue(targetElement) {
  let value = null;
  targetElement.forEach((element) => {
    if (element.checked) {
      value = element.value;
    }
  });
  return value;
}

function sendMessage() {
  let targetDic = {
    "tawara": "俵",
    "nakamura": "中村",
    "nisii": "西井",
    "nogami": "野上",
    "nozaki": "野崎"
  };
  let name = getParam("name")
  if (name in targetDic) {
    window.location.href = `https://script.google.com/macros/s/AKfycbyR8Zt5PHcSXLt6FfippmKRoVfzyQ6C0oWT4ykSIk8Y2hGlFzTMY8XCgs3uwuYqfvco/exec?name=${name}`;
  }
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name) {
  url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
