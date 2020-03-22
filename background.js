chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
},
    function tab(tab) {
        const originalURL = tab[0].url;
        console.log('originalURL: ', originalURL);
        return originalURL;



    });


chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['https', 'http', 'chrome'] },
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
    function (text, suggest) {
        console.log('inputChanged: ' + text);
        suggest([
            { content: text + " one", description: "the first one" },
            { content: text + " number two", description: "the second entry" }
        ]);
    });



// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function (text) {
        console.log('inputEntered: ' + text);
        chrome.storage.sync.get(['shortcuts'], function (result) {
            console.log('result: ', result);
            console.log('Value currently is ' + result.shortcuts.shortcuts[text]);
            newURL = result.shortcuts.shortcuts[text];
            console.log('mjm: ', newURL);
            chrome.tabs.update({ url: newURL });
        });
    });

    //see everything stored
    chrome.storage.sync.get(null, function (data) { console.info(data) });

    //remove a single entry
    // chrome.storage.sync.remove('shortcuts', function () { console.log('removed')});