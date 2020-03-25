// newShortcut - {shortcut: url}
function submit() {
    console.log('in the submit');
    var url = document.getElementById('originalURL').value;
    var shortcut = document.getElementById('shorcut').value;
    chrome.storage.sync.get({ 'shortcuts': [] }, result => {
        console.log('result: ', result);
        console.log('in the get');
        var temp = result.shortcuts;
        temp.push({ [shortcut]: url });
        chrome.storage.sync.set({ 'shortcuts': temp }, function () {
            console.log('in the set');
            if (chrome.runtime.error) {
                console.log('Runtime error.');
            }
        });
    });
}

function handleClearAll() {
    chrome.storage.sync.remove('shortcuts', function () { console.log('cleared')});
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('document loaded');
    var form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('added to form');
    })

    var clearAll = document.getElementById("clear-all");
    clearAll.addEventListener('handleClearAll', function(e) {
        e.preventDefault();
        console.log('clearing sync');
    })
})