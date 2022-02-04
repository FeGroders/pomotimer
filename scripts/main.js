document.addEventListener('DOMContentLoaded', function() {
    let myExtId = 'nlkondbeopkkjmpjjgpjpjjoehnkkckn';

    chrome.runtime.sendMessage(myExtId, {type: 'openAction'}, function handler(response) { });

    document.querySelector('#btn-start').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'start'}, function handler(response) { });
    });

    document.querySelector('#btn-pause').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'pause'}, function handler(response) { });
    });

    document.querySelector('#btn-reset').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'reset'}, function handler(response) { });
    });  
    
    document.querySelector('#btn-pomodoro').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'pomodoro'}, function handler(response) { });
    }); 

    document.querySelector('#btn-short-break').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'shortBreak'}, function handler(response) { });
    }); 

    document.querySelector('#btn-long-break').addEventListener('click', function() {
        chrome.runtime.sendMessage(myExtId, {type: 'longBreak'}, function handler(response) { });
    }); 

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        view = chrome.extension.getViews({ type: "popup" })
        console.log(view.length);
        if (request.type == 'setTime') {
            document.querySelector('#time').innerHTML = request.time;
        }
        sendResponse({ received: true });
    });
});