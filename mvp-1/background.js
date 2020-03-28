chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
},
    function tab(tab) {
        const originalURL = tab[0].url;
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


//redirect to url
chrome.omnibox.onInputEntered.addListener(
    function (text) {
        chrome.storage.sync.get('shortcuts', function (result) {
            newURL = result.shortcuts[text];
            chrome.tabs.update({ url: newURL });
        });
    });

//see everything stored
chrome.storage.sync.get(null, function (data) { console.table('shortcuts: ', data) });