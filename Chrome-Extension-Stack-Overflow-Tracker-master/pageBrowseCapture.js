var time_at_loading = "";
var tags_of_question = [];

//TRACKING MOUSE COORDINATES
var pageCoords = [];

document.onmouseleave = function(e) {
    window.mouseX = 0;
    window.mouseY = 0;
};

document.onmousemove = function(e) {
    var event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
    window.pageUrl = window.location.href;
};

function recordCoords() {
    if (window.mouseX && window.mouseY && !(window.mouseX==0) && !(window.mouseY==0)){
        pageCoords.push({
            x: window.mouseX,
            y: window.mouseY
        });

    };

};

window.onload = function() {
    setInterval(recordCoords, 500);
};

window.onbeforeunload = function() {
    time_at_loading = new Date();
    var event = new Object();
    var now = (new Date()).toJSON();
    console.log("Below is window object");
    console.log(window);
    // var divs = document.getElementsByTagName("div"), i=divs.length;
    //Remove Duplicate Tags!!!!
    var tag_div = document.getElementsByTagName('div');
    if(tag_div){
        tag = document.getElementsByClassName('post-tag js-gps-track'),i = tag.length;
        console.log(tag);
        while (i--) {
            var x = tag[i].innerHTML;
            if(tags_of_question.indexOf(x)<0){
                tags_of_question.push(x);
            }
        }
    }
    // tags_of_question= document.getElementsByClassName('post-tag js-gps-track').constructor;
    console.log(tags_of_question);
    event.tags = tags_of_question;
    event.timestamp = now;
    event.url = window.pageUrl;
    event.activity = "PageBrowse!";
    event.coords = pageCoords;

    chrome.runtime.sendMessage(event, function(response) {
        console.log("This will be sent!");
        console.log(event);
        console.log(response.acknowledgment);
    });
};
