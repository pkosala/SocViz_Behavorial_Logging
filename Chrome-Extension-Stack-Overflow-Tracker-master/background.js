var sendPost = function(request) {
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:8082/behavior",
            data: JSON.stringify({request}),
            contentType: "application/json",
            dataType: "json"
        }
    )
};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.activity) {
            console.log("############### this is background page output ################");
            console.log(typeof request);
            console.log(request);
            console.log("#####################################");
            sendPost(request);
            sendResponse( {acknowledgment: 'Activity saved'} );
        }
        else {
            sendResponse( {acknowledgment: 'Empty activity has been discarded'});
        }
    }
);