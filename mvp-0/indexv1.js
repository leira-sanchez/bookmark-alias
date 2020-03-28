//TODO: cambiar los nombres a las variables

var button = document.getElementById('submit-btn');
console.log('button: ', button);
button.addEventListener('click', submit);

var originalURL = document.getElementById('originalURL').value;
console.log('originalURL2: ', originalURL);

function submit() {
    console.log('in the submit');
    var originalURL = document.getElementById('originalURL').value;

    var shortcut = document.getElementById('shortcut').value;
    chrome.storage.sync.get('shortcuts', function (data) {
        // if {shortcuts: {}} doesn't exist, this will create it
        if (data.shortcuts) {
            console.log('old data: ', data);
            for (let prop in data.shortcuts) {
                console.log('prop: ', prop);
            }
        }
        console.log('data: ', data);
        // chrome.storage.sync.remove('newData', function () { console.log('removed') });
        setData(data.shortcuts, originalURL, shortcut);

    })
};


function setData(data, originalURL, shortcut) {
    // const { data, originalURL, shortcut } = payload;
    console.log('set originalURL: ', originalURL);
    console.log('set shorcut: ', shortcut);


    let newData = data;
    //TODO: add handling for when the send an empty request
    // TODO: make it possible to submit form by clicking enter
    newData = {
        ...data,
        [shortcut]: originalURL
    }
    console.log('the newData: ', newData);

    chrome.storage.sync.set({ 'shortcuts': newData }, function () {
        console.log('Your shortcuts are: ' + newData);
    })


}



function handleClearAll() {
    console.log('in the handleClearAll');
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
    clearAll.addEventListener('click', handleClearAll);
    //TODO: add interaction when it's already been cleared
})

// chrome.storage.sync.set({ shortcuts: { "google": "http://google.com" }, function(data) { console.log(data) } });