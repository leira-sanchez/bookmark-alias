// alert('hello, world');

var button = document.getElementById('submit-btn');
console.log('button: ', button);
button.addEventListener('click', submit);

var originalURL = document.getElementById('originalURL').value;
console.log('originalURL2: ', originalURL);
var data = {
    "dev": "http://dev.to",
    "fem": "http://frontendmasters.com",
    "tw": "http://twitter.com"
}

function submit() {
    console.log('in the submit');
    var originalURL = document.getElementById('originalURL').value;
    console.log('originalURL2: ', originalURL);

    var shortcut = document.getElementById('shortcut').value;
    console.log('shortcut2: ', shortcut);
    setData(originalURL, shortcut);
}

function setData(originalURL, shortcut ) {
    console.log('set originalURL: ', originalURL);
    console.log('set shorcut: ', shortcut);
    chrome.storage.sync.get('shortcuts', function (data) {
        if(data) {
            console.log('old data: ', data["shortcuts"]);
            for(let i=0; i< data.length; i++) {
                console.log('props: ', data[i]);
            }
        }
        data["shortcuts"][shortcut] = originalURL;
        console.log('the new shortcut: ', data);
        chrome.storage.sync.set({ "shortcuts": data }, function () {
            console.log('Your shortcuts are: ' + shortcut + '. For ' + originalURL);
        })

    });
}



document.addEventListener('DOMContentLoaded', function () {
    console.log('document loaded');
    var form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        console.log('added to form');
    })
})

chrome.storage.sync.set({ shortcuts: { "google": "http://google.com" }, function(data) { console.log(data) } });