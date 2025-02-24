window.startIndex = 1;
window.limit = 1;
window.len = [...document.querySelectorAll(".cl-primary")].length;
window.timeId = null;
window.href = window.location.href;
window.isFinish = false;
window.video = undefined;

start();

function start() {
    window.limit = window.limit - 1;

    if (window.len - window.startIndex < 0) {
        console.log("所有视频播放结束");
        return;
    }

    window.isFinish = false;

    goLearnPage(() => {
        closeModal();
        onVideoEnd();
    });
}

function goLearnPage(callback) {
    const continueLearnBtn = [...document.querySelectorAll(".cl-primary")][
        window.startIndex - 1
    ];
    console.log("continueLearnBtn", continueLearnBtn);
    continueLearnBtn.click();

    console.log("进入video");

    setTimeout(() => {
        callback();
    }, 5000);
}

function handleTimeUpdate() {
    if (
        Math.floor(window.video.currentTime) >= Math.floor(window.video.duration)
    ) {
        setTimeout(() => {
            finish();
        }, 1000);
    }
}

function onVideoEnd() {
    console.log("开始监听当前视频是否结束");
    window.video = document.querySelector("video");
    window.video.loop = false;

    window.video.addEventListener("timeupdate", handleTimeUpdate, false);

    window.video.addEventListener(
        "ended",
        function () {
            finish();
        },
        false
    );
}

function finish() {
    if (window.isFinish) {
        return;
    }
    if (window.limit <= 0) {
        console.log("已经学完了规定数量");
        window.location.href = 'https://www.baidu.com/'
        return;
    }
    window.isFinish = true;
    window.video.removeEventListener("timeupdate", handleTimeUpdate, false);
    window.video = undefined;
    console.log("当前视频结束，准备下一个...");
    window.location.href = window.href;

    setTimeout(() => {
        window.startIndex++;
        start();
    }, 2000);
}

function closeModal() {
    if (window.timeId) {
        clearInterval(window.timeId);
    }

    document.querySelector(".ant-modal-footer button")?.click();

    window.timeId = setInterval(() => {
        document.querySelector(".ant-modal-footer button")?.click();
    }, 5000);
}
