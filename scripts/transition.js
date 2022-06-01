
start_button = document.getElementById('mainButton')

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

let model, webcam, labelContainer, maxPredictions;
let state = false//用来关闭不管猜测的数据

// 加載圖像模型並設置網絡攝像頭
async function sight() {

    const modelURL = "./model/model.json";
    const metadataURL = "./model/metadata.json";

    model = await tmImage.load(modelURL, metadataURL); // 加載模型
    maxPredictions = model.getTotalClasses(); // 所有模型類

    webcam = new tmImage.Webcam(300, 300, false); // canvas width , canvas height, canvas 是否翻轉網絡攝像頭
    await webcam.setup(); // 請求訪問網絡攝像頭
    webcam.play();  // 開啟網絡攝像頭

    // 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
    state = true
    window.requestAnimationFrame(loop);

    $("#hand_shodow canvas").replaceWith(webcam.canvas)//手影視線窗口
}

async function loop() {
    if (state) {
        webcam.update(); // 實時更新網絡攝像頭框架
        await predict(); // 實時更新概率
        window.requestAnimationFrame(loop);//實時更新動畫
    }
}

async function predict() {
    const prediction = await model.predict(webcam.canvas); //實時類的概率
    for (let i = 0; i < maxPredictions; i++) {
        // 猜測的結果
        const classPrediction = prediction[i].className + "（" + prediction[i].probability.toFixed(2) + "）";

        // 顯示 Reindeer Dog Eagle 實時猜測值
        if (classPrediction.includes("Reindeer")) {
            $("#hand_shodow p")[i].innerHTML = classPrediction
        } else if (classPrediction.includes("Dog")) {
            $("#hand_shodow p")[i].innerHTML = classPrediction
        } else if (classPrediction.includes("Eagle")) {
            $("#hand_shodow p")[i].innerHTML = classPrediction
        }

        // 概率大於0.85的手影圖片，突出邊框
        if (prediction[i].probability.toFixed(2) > 0.8) {
            $("#hand_shodow img")[i].setAttribute("class", "active")
        } else {
            $("#hand_shodow img")[i].setAttribute("class", "")
        }
    }
}

async function hand_shodow_next() {
    // 顯示拍照頁面
    qrcode = document.getElementById('qrcode')
    qrcode.style.display = 'block'
    // 清空內容
    clear()
}

let isStart = false
// 拍照
async function photograph_start() {
    webcam = new tmImage.Webcam(300, 300, false); // canvas width , canvas height, canvas 是否翻轉網絡攝像頭
    await webcam.setup();
    webcam.play();  // 開啟網絡攝像頭

    window.requestAnimationFrame(photograph_loop);//實時更新動畫
    $("#qrcode_avatar_1 canvas").replaceWith(webcam.canvas)//拍照視線窗口
}

function photograph_loop() {
    webcam.update(); // 實時更新網絡攝像頭框架
    window.requestAnimationFrame(photograph_loop);//實時更新動畫
}

// 頭像截取
function intercept() {
    qrcode_avatar = document.getElementById('qrcode_avatar')
    qrcode_avatar.appendChild(webcam.canvas);
    photograph_start()//重新截取會保留上一時刻的東西
}

// 進入到結束頁面
function qrcode_next() {
    end_card = document.getElementById('end_card')
    end_card.style.display = 'block'
    clear()
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

    // 關掉拍照
    closeMedia()
}

// 摄影停止
async function clear() {
    if (state) state = false  // 停止手影猜測
    // 手影比對視線窗口還原
    $("#hand_shodow canvas").replaceWith('<canvas width="300" height="300"></canvas>')
    //
    $("#video").replaceWith('<video id="video" autoplay="autoplay"></video>')
    $("#canvas").replaceWith('<canvas id="canvas"></canvas>')
    // $("#imgTag").replaceWith('<img id="imgTag" src="assets/image/avatar.jpg" alt="imgTag"/>')
}

let mediaStreamTrack = null; // 视频对象(全局)
function openMedia() {
    let constraints = {
        video: { width: 300, height: 300 },
        audio: true
    };
    //获得video摄像头
    let video = document.getElementById('video');
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((mediaStream) => {
        mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[1];
        video.srcObject = mediaStream;
        video.play();
    });
}

// 拍照
function takePhoto() {

    //获得Canvas对象
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');

    // 高分辨率屏幕上清晰显示canvas图形
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;

    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, 300, 300);

    // 照片鏈接 toDataURL  ---  可传入'image/png'---默认, 'image/jpeg'
    let img = document.getElementById('canvas').toDataURL();

    // 这里的img就是得到的图片
    // document.getElementById('imgTag').src = img;
}

// 关闭摄像头
function closeMedia() {
    mediaStreamTrack.stop();
}

