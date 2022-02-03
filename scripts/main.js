document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#btn-start').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'start'}, function handler(response) { });
    });

    document.querySelector('#btn-pause').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'pause'}, function handler(response) { });
    });

    document.querySelector('#btn-reset').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'reset'}, function handler(response) { });
    });  
    
    document.querySelector('#btn-pomodoro').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'pomodoro'}, function handler(response) { });
    }); 

    document.querySelector('#btn-short-break').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'shortBreak'}, function handler(response) { });
    }); 

    document.querySelector('#btn-long-break').addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'longBreak'}, function handler(response) { });
    }); 

    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.type == 'setTime') {
                document.querySelector('#time').innerHTML = request.time;
            }
        }
    );
});
