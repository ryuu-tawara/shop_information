function nextPage() {
    let surnameElement = document.getElementsByName("surname");
    let len = surnameElement.length;
    let checkValue = '';

    for (let i = 0; i < len; i++) {
        if (surnameElement.item(i).checked) {
            checkValue = surnameElement.item(i).id;
        }
    }

    let showDiv = document.getElementById("notNameSelect")
    // ラジオボタンが選択されていない場合に選択を促す
    if (checkValue == '') {
        showDiv.style.display = 'block';
    } else {
        showDiv.style.display = 'none';
        window.location.href = `./name/index.html?name=${checkValue}`;
    }
}