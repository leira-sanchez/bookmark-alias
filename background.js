
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });
});

// chrome.tabs.getCurrent(function (tab) {
//     console.log(tab);
// })

chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
},
    function (tab) {
        console.log(tab[0].url);
        // chrome.tabs.update(tab.id, {url: 'http://google.com'});
    });


chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'developer.chrome.com' },
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});