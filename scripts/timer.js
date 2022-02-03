let defaultHours = 0;
let defaultMinutes = 0;
let defaultSeconds = 10;
let hour = defaultHours;
let minute = defaultMinutes;
let second = defaultSeconds;
let cron;
let finalHour = '00:00:00';

chrome.runtime.onInstalled.addListener(() => {
    refreshFinalHour();
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type == 'start') {
                start();
            } else if (request.type == 'pause') {
                pause();
            } else if (request.type == 'reset') {
                reset();
            } else if (request.type == 'pomodoro') {
                setPomodoro();
            } else if (request.type == 'shortBreak') {
                setShortBreak();
            } else if (request.type == 'longBreak') {
                setLongBreak();
            }
            sendResponse({minute: minute, time: finalHour});
        });

    function start() {
        pause();
        cron = setInterval(() => { timer(); }, 1000);
    }

    function pause() {
        clearInterval(cron);
        refreshBadge();
    }

    function reset() {
        hour = defaultHours;
        minute = defaultMinutes;
        second = defaultSeconds;
        refreshFinalHour();
        chrome.browserAction.setBadgeText({text: ''}); 
    }

    function timer() {
        if (second == 0 && minute == 0 && hour == 0) {
            pause();
            reset();
            var audio = new Audio('/src/sound/alarm.mp3');
                audio.addEventListener('canplaythrough', function() {
                audio.volume = 0.5;
                audio.play();
            });
            notify();
            return;
        }

        if ((second -= 1) <= 0 && minute > 0) {
            second = 59;
            minute--;
        }
        if (minute == 0 && hour > 0) {
            minute = 60;
            hour--;
        }
        refreshFinalHour();
        refreshBadge()
    }

    function returnData(input) {
        return input >= 10 ? input : `0${input}`
    }

    function refreshFinalHour() {
        finalHour = returnData(hour) + ':' + returnData(minute) + ':' + returnData(second);
    };

    function refreshBadge() {
        chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' });
        chrome.browserAction.setBadgeText({text: minute+"'"}); 
    }

    function notify() {
        chrome.notifications.create({
            type: 'basic',
             iconUrl: '../src/img/icon.png',
            title: '25 minutes have passed',
            message: 'One pomodoro completed, take a short break.',
            requireInteraction: true,
            buttons: [{ title: 'Restart timer' }]
        })
    }

    function setPomodoro(){
        defaultHours = 0;
        defaultMinutes = 25;
        defaultSeconds = 0;
        reset();
    }

    function setShortBreak(){
        defaultHours = 0;
        defaultMinutes = 5;
        defaultSeconds = 0;
        reset();
    }

    function setLongBreak(){
        defaultHours = 0;
        defaultMinutes = 15;
        defaultSeconds = 0;
        reset();
    }
  });