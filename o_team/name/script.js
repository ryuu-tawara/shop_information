// 変数定義
const point = [0, 1, 2];
const [dates, holidays] = getDays()

// 初期化処理
// テーブルを作成する
for (let i = 0; i < holidays.length; i++) {
  let tr = document.createElement("tr");
  tr.setAttribute("id", "checkSelect");
  let td = document.createElement("td");
  td.textContent = holidays[i];
  tr.appendChild(td);
  document.getElementById("days").appendChild(tr);

  for (let j = 0; j < point.length; j++) {
    let td = document.createElement("td");
    let input = document.createElement("input");
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
 * @returns [YYYY-MM,YYYY年MM月DD日 W曜日]
 */
function getDays() {
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();
  let mm = m + 1;
  // 末日までの日数
  let d = new Date(y, mm, 0).getDate();

  let dates = [];
  let showDay = [];
  for (let i = 1; i <= d; i++) {
    // [i]日が一週間の中で何番目かを取得。実行結果は0から数えた番号で返される。
    let w = new Date(y, m, [i]).getDay();

    let ww = ["日", "月", "火", "水", "木", "金", "土"];

    // [i]日の曜日が、日曜と土曜の時だけ書き出す
    if (w === 0 || w === 6) {
      let day = i.toString().padStart(2, "0");
      let month = mm.toString().padStart(2, "0");
      dates.push(y + "-" + month + "-" + day);
      showDay.push(y + "年" + month + "月" + day + "日\t" + ww[w] + "曜日");
    }
  }

  return [dates, showDay];
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
  let days = dates.length;
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

function sendData() {
  let targetDic = {
    "tawara": "俵",
    "nakamura": "中村",
    "nisii": "西井",
    "nogami": "野上",
    "nozaki": "野崎",
    "tokura": "戸倉",
  };
  let name = getParam("name")
  
  let error = document.getElementById("error")
  if (name in targetDic) {
    sendDate = {}
    for(let i = 0; i < dates.length; i++) {
      let targetDay = "day_" + i;
      let checkedValue = getCheckedValue(document.form.elements[targetDay]);
      sendDate[dates[i]] = checkedValue;
    }
    error.style.display = 'none';
    window.location.href = `https://script.google.com/macros/s/AKfycbx96jqvMdKa2LDYpbOS4c_W8MFMxHvBuMVgoLL5FVcYW9qkTvNsmWhDb-1ek5pC5F5-/exec?name=${name}&&dates=${JSON.stringify(sendDate)}`;
  } else {
    error.style.display = 'block';
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
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
