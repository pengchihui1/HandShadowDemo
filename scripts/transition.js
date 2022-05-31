
start_button = document.getElementById('mainButton')

// const pages = {
//     "main": 1,
//     "introduction": 2,
//     "pin_code": 3,
//     'game_canvas': 4,
//     "qrcode": 5,
//     "end_card": 5
// }

// var active_page = pages.main;

// 重新開始遊戲
function again() {
    end_card = document.getElementById('end_card')
    main = document.getElementById('main')
    pin_code = document.getElementById('pin_code')
    chinese = document.getElementById('introduction_chinese')
    english = document.getElementById('introduction_english')
    portuguese = document.getElementById('introduction_portuguese')
    hand_shodow = document.getElementById('hand_shodow')
    qrcode = document.getElementById('qrcode')

    main.style.display = 'block'
    pin_code.style.display = 'none'

    end_card.style.display = 'none'
    clearInterval(window.endCarTimer) //清除結束頁面倒計時

    chinese.style.display = 'none'
    english.style.display = 'none'
    portuguese.style.display = 'none'
    clearInterval(window.languageCarTimer) //清除語言頁面倒計時

    hand_shodow.style.display = 'none'
    qrcode.style.display = 'none'
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

function pin_code_start() {
    hand_shodow = document.getElementById('hand_shodow')
    hand_shodow.style.display = 'block'
}

function hand_shodow_next() {
    qrcode = document.getElementById('qrcode')
    qrcode.style.display = 'block'
}


function qrcode_next() {
    end_card = document.getElementById('end_card')
    end_card.style.display = 'block'

    // 結束頁面倒計時
    window.endCarNum = 10
    $('#endButton').text(`再來！（${window.endCarNum}）`)
    window.endCarTimer = setInterval(() => {
        window.endCarNum -= 1
        $('#endButton').text(`再來！（${window.endCarNum}）`)
        if (window.endCarNum <= 0) {
            again()
        }
    }, 1000)

}