const stopwatchDuration = document.getElementById("stopwatchDuration");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");

let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;
let timeInterval;

start.onclick = () => {
    timeInterval = setInterval(() => {
        ms++;
        if (ms == 100) {
            secs++;
            ms = 0;
        }
        if (secs == 60) {
            mins++;
            secs = 0;
        }
        if (mins == 60) {
            hrs++;
            mins = 0;
            secs= 0;
        }

        stopwatchDuration.innerHTML = `${zeroPad(hrs)} : ${zeroPad(mins)} : ${zeroPad(secs)} : ${zeroPad(ms)}`;
    }, 10);

    start.setAttribute("style", "display : none");
    stop.setAttribute("style", "display : inline-block");
    lap.setAttribute("style", "display : inline-block");
    lap.removeAttribute("disabled");
    reset.setAttribute("style", "display : none");
};

const zeroPad = (num) => {
    return String(num).padStart(2, '0');
}

let lapCount = 0;
laps= document.getElementById("laps");
lap.onclick = () => {
    lapCount++;
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `Lap ${lapCount} : ${zeroPad(hrs)} : ${zeroPad(mins)} : ${zeroPad(secs)} : ${zeroPad(ms)}`;
    laps.appendChild(lapItem);

    //To scroll to the bottom when a new lap is added
    laps.scroll({ behavior: "smooth", top: laps.scrollHeight });
};

stop.onclick = () => {
    clearInterval(timeInterval);

    lap.setAttribute("style", "display : none");
    reset.setAttribute("style", "display : inline-block");
    reset.setAttribute("style", "display : inline-block");
    start.setAttribute("style", "display : inline-block");
    start.innerHTML = "Resume";
    stop.setAttribute("style", "display : none");
};

reset.onclick = () => {
    laps.innerHTML = "";
    lapCount = 0;
    clearInterval(timeInterval);
    hrs = 0;
    mins = 0;
    secs = 0;
    ms = 0;
    stopwatchDuration.innerHTML = "00 : 00 : 00 : 00";

    reset.setAttribute("style", "display : none");
    start.setAttribute("style", "display : inline-block");
    start.innerHTML = "Start";
    lap.setAttribute("style", "display : inline-block");
    lap.setAttribute("disabled", "true");
    stop.setAttribute("style", "display : none");
}
