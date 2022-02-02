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

    refreshing = setInterval(() => { 
        chrome.runtime.sendMessage(null, {type: 'getTime'}, function handler(response) {
            document.querySelector('#time').innerHTML = response.time;  
        });       
     }, 100);
});