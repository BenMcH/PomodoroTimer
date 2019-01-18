const time = document.getElementById('time');
const pomodoro = document.getElementById('pomodoro');
const shortBreak = document.getElementById('short-break');
const longBreak = document.getElementById('long-break');
const playPause = document.getElementById('play-pause');
const stop = document.getElementById('stop');
const LONG_BREAK = 15 * 60;
const SHORT_BREAK = 5 * 60;
const POMODORO = 25 * 60;
var timerStartedAt;
var timerLength = POMODORO;
var timer;

function updateTime() {
    const secondsLeft = getTimeLeft();
    var timeLabel = formattedTime(secondsLeft);
    time.innerText = timeLabel;
    document.title = `Pomodoro! - ${timeLabel}`
}

function formattedTime(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const displaySeconds = `0${seconds}`.slice(-2)
    var timeLabel = `${minutes}:${displaySeconds}`;
    if(minutes === 0) {
        timeLabel = `${seconds}s`;
    }
    return timeLabel;
}

function getTimeLeft() {
    const elapsedTime = Math.floor((Date.now() - timerStartedAt) / 1000);
    var timeLeft = timerLength - elapsedTime;
    if(timeLeft <= 0) {
        timeLeft = 0;
    }
    if(!timerStartedAt) {
        timeLeft = timerLength;
    }
    return timeLeft;
}

function toggleTimer() {
    if(timerStartedAt) {
        timerLength = getTimeLeft();
        timerStartedAt = null;
        playPause.innerText = 'Play';
    } else {
        timerStartedAt = Date.now();
        start(timerLength);
        playPause.innerText = 'Pause';
    }
}

function start(seconds) {
    timerStartedAt = Date.now();
    timerLength = seconds;
    playPause.innerText = 'Pause';
}

function reset() {
    if(!confirm("Are you sure you want to reset? You'll loose your time!")) {
        return;
    }
    timerStartedAt = null;
    timerLength = 0;
    playPause.innerText = 'Play';
}

timer = setInterval(updateTime, 500);
pomodoro.addEventListener('click', () => start(25 * 60));
shortBreak.addEventListener('click', () => start(5 * 60));
longBreak.addEventListener('click', () => start(15 * 60));
playPause.addEventListener('click', () => toggleTimer());
stop.addEventListener('click', () => reset());
requestAnimationFrame(updateTime);

document.body.addEventListener('keyup', (e) => {
    switch(e.keyCode) {
        case 80: // p
            start(POMODORO);
            break;
        case 83: // s
            start(SHORT_BREAK);
            break;
        case 76: // l
            start(LONG_BREAK);
            break;
        case 32: // Space
            toggleTimer();
            break;
        case 81: // q
            reset();
    }
});