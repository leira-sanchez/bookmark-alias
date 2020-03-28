var button = document.getElementById('submit-btn');
button.addEventListener('click', submit);

var form = document.getElementById('form');
var alert = document.getElementById('status-alert');
var cleared = document.getElementById('cleared-alert');

function submit() {
    var url = document.getElementById('url').value;

    var shortcut = document.getElementById('shortcut').value;
    // if {shortcuts: {}} doesn't exist, this will create it
    chrome.storage.sync.get('shortcuts', function (data) {
        setData(data.shortcuts, url, shortcut);

    })
};


function setData(data, url, shortcut) {
    let newData = data;
    newData = {
        ...data,
        [shortcut]: url
    }

    chrome.storage.sync.set({ 'shortcuts': newData }, function () {
        console.log('New shortcut added!');
        alert.innerHTML = '<p>Added!</p>';
    });
    form.reset();
};



function handleClearAll() {
    chrome.storage.sync.remove('shortcuts', function () {
        console.log('cleared');
        cleared.innerHTML = '<p>Deleted All!</p>';
    });
}

document.addEventListener('DOMContentLoaded', function () {

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    })

    var clearAll = document.getElementById("clear-all");
    clearAll.addEventListener('click', handleClearAll);
})
