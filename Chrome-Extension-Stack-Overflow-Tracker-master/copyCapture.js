document.addEventListener('copy', function(e) {

    var highlight = window.getSelection().toString();
    if(highlight) {
        var event = new Object();
        event.url = window.pageUrl;
        event.activity = "Copy!";
        var now = (new Date()).toJSON();
        event.timestamp = now;
        event.data = highlight;
        if (event.activity) {
            chrome.runtime.sendMessage(event, function(response) {
                console.log(response.ack);
            });
        }
    }
});
