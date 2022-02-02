document.addEventListener('DOMContentLoaded', function() {
    let hour = 0;
    let minute = 0;
    let second = 10;
    let millisecond = 0;
    let cron;

    document.querySelector('#time').innerHTML = returnData(hour) + ':' + returnData(minute) + ':' + returnData(second);

    document.querySelector('#btn-start').addEventListener('click', function() {
        start();
    });

    document.querySelector('#btn-pause').addEventListener('click', function() {
        pause();
    });

    document.querySelector('#btn-reset').addEventListener('click', function() {
        reset();
    });

    function start() {
        pause();
        cron = setInterval(() => { timer(); }, 10);
    }

    function pause() {
        clearInterval(cron);
    }

    function reset() {
        hour = 0;
        minute = 0;
        second = 60;
        millisecond = 0;
        document.querySelector('#time').innerHTML = returnData(hour) + ':' + returnData(minute) + ':' + returnData(second);
    }

    function timer() {
        if (millisecond == 0 && second == 0 && minute == 0 && hour == 0) {
            pause();
            var audio = new Audio('/src/sound/alarm.mp3');
                audio.addEventListener('canplaythrough', function() {
                audio.volume = 0.5;
                audio.play();
            });
        }

        if ((millisecond -= 10) <= 0 && second > 0) {
            millisecond = 1000;
            second--;
        }
        if (second == 0 && minute > 0) {
            second = 10;
            minute--;
        }
        if (minute == 0 && hour > 0) {
            minute = 60;
            hour--;
        }
        document.querySelector('#time').innerHTML = returnData(hour) + ':' + returnData(minute) + ':' + returnData(second);
    }

    function returnData(input) {
    return input > 10 ? input : `0${input}`
    }
});