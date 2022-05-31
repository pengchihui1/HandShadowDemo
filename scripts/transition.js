
start_button = document.getElementById('mainButton')

const pages = {
    "main": 1,
    "card": 2,
    "game": 3,
    "end_card": 5
}

var active_page = pages.main;

// 重新開始遊戲
function again() {
    var end_card = document.getElementById('end-card')
    var main = document.getElementById('main')
    var fraction = document.getElementById('fraction');
    var prediction = document.getElementById('prediction');
    chinese = document.getElementById('introduction_chinese')
    english = document.getElementById('introduction_english')
    portuguese = document.getElementById('introduction_portuguese')
    pin_code = document.getElementById('pin_code')
    active_page = pages.main;//設置當前頁面
    main.style.display = 'block'
    end_card.style.display = 'none'
    window.fractionNumber = 0 //重置得分
    fraction.textContent = window.fractionNumber
    prediction.style.zIndex = -10

    chinese.style.display = 'none'
    english.style.display = 'none'
    portuguese.style.display = 'none'
    clearInterval(window.languageCarTimer) //清除語言頁面倒計時

    pin_code.style.display = 'none'
}

// 選擇語言
function language_game(number) {
    chinese = document.getElementById('introduction_chinese')
    english = document.getElementById('introduction_english')
    portuguese = document.getElementById('introduction_portuguese')
    switch (parseInt(number)) {
        case 1:
            chinese.style.display = 'block'
            english.style.display = 'none'
            portuguese.style.display = 'none'
            break;
        case 2:
            chinese.style.display = 'none'
            english.style.display = 'block'
            portuguese.style.display = 'none'
            break;
        case 3:
            chinese.style.display = 'none'
            english.style.display = 'none'
            portuguese.style.display = 'block'
            break;
    }

    // 語言頁面倒計時
    window.languageCarNum = 60
    $('.introduction_start').text(`開始（${window.languageCarNum}）`)
    window.languageCarTimer = setInterval(() => {
        window.languageCarNum -= 1
        $('.introduction_start').text(`開始（${window.languageCarNum}）`)
        if (window.languageCarNum <= 0) {
            again()
        }
    }, 1000)
}


function language_start() {
    pin_code = document.getElementById('pin_code')
    pin_code.style.display = 'block'
    clearInterval(window.languageCarTimer) //清除語言頁面倒計時
}