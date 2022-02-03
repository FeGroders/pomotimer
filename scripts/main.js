document.addEventListener('DOMContentLoaded', function() {
    let refreshing;

    document.querySelector('#btn-start').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'start'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    });

    document.querySelector('#btn-pause').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'pause'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    });

    document.querySelector('#btn-reset').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'reset'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    });  
    
    document.querySelector('#btn-pomodoro').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'pomodoro'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    }); 

    document.querySelector('#btn-short-break').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'shortBreak'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    }); 

    document.querySelector('#btn-long-break').addEventListener('click', function() {
        chrome.runtime.sendMessage(null, {type: 'longBreak'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });
    }); 

    refreshing = setInterval(() => { 
        chrome.runtime.sendMessage(null, {type: 'getTime'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });       
     }, 100);
});