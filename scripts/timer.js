let defaultHours = 0;
let defaultMinutes = 25;
let hour = defaultHours;
let minute = defaultMinutes;
let actualStage = 'pomodoro';
let finalHour = '00:00';

chrome.runtime.onInstalled.addListener(() => {
    refreshFinalHour();
    setTime();

    chrome.runtime.onMessage.addListener(
        function(request, sendResponse) {
            if (request.type == 'start') {
                console.log('start');
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
            setTime();
        });

    function start() {
        pause();
        chrome.alarms.create("timer", { periodInMinutes: 0.1 });
        console.log(chrome.alarms.getAll());
    }

    function pause() {
        chrome.alarms.clearAll();
        console.log('pause');
        console.log(chrome.alarms.getAll());
        refreshBadge();
    }

    function reset() {
        hour = defaultHours;
        minute = defaultMinutes;
        refreshFinalHour();
        chrome.action.setBadgeText({text: ''}); 
    }

    function returnData(input) {
        return input >= 10 ? input : `0${input}`
    }

    function refreshFinalHour() {
        finalHour = returnData(hour) + ':' + returnData(minute);
    };

    function refreshBadge() {
        chrome.action.setBadgeBackgroundColor({ color: '#F00' });
        chrome.action.setBadgeText({text: minute+"'"}); 
    }

    function notify() {
        let message;
        switch (actualStage) {
            case 'pomodoro':
                message = 'One pomodoro completed, take a short break.';
            case 'shortBreak':
                message = 'Short break finished!';
            case 'longBreak':
                message = 'Long break finished!';
        }

        chrome.notifications.create({
            type: 'basic',
             iconUrl: '../src/img/icon.png',
            title: defaultMinutes+' minutes have passed',
            message: message,
            requireInteraction: true,
            buttons: [{ title: 'Ok' }]
        })
    }

    function setPomodoro(){
        defaultHours = 0;
        defaultMinutes = 25;
        actualStage = 'pomodoro';
        reset();
    }

    function setShortBreak(){
        defaultHours = 0;
        defaultMinutes = 5;
        actualStage = 'shortBreak';
        reset();
    }

    function setLongBreak(){
        defaultHours = 0;
        defaultMinutes = 15;
        actualStage = 'longBreak';
        reset();
    }

    chrome.alarms.onAlarm.addListener(() => {
        tick();
    });

    function tick(){
        if (minute == 0 && hour == 0) {
            pause();
            reset();
            notify();
            var audio = new Audio('/src/sound/alarm.mp3');
                audio.addEventListener('canplaythrough', function() {
                audio.volume = 0.5;
                audio.play();
            });
            return;
        }

        if ((minute -= 1) <= 0 && hour > 0) {
            minute = 59;
            hour--;
        }

        refreshFinalHour();
        refreshBadge();  
        setTime();
    }

    function setTime(){
        chrome.runtime.sendMessage({type: 'setTime', time: finalHour});
    }
  });

