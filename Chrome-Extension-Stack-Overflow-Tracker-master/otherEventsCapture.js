
var tags_of_question = [];
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var tag_div = document.getElementsByTagName('div');
    // tag_div.push(document.getElementsByTagName('a'));
    if(tag_div){
        tag = document.getElementsByClassName('post-tag js-gps-track'),i = 0;
        console.log(tag);
        while (i<tag.length) {
            var x = tag[i].innerHTML;
            if(tags_of_question.indexOf(x)<0){
                tags_of_question.push(x);
            }
            i++;
        }
    }
    console.log("####################################################");
    console.log("Tags are already captured");
    console.log(tags_of_question);
    console.log("####################################################");
    
    var event = new Object();
    event.url = window.pageUrl;
    var now = (new Date()).toJSON();
    event.timestamp = now;
    // console.log(target);
    // console.log(target.className);
    // console.log(target.value);
    if (target.className.match(/^vote-up-off.*$/)){
        event.activity = "UpVote!";
        event.tags = tags_of_question;
        console.log("Upvote!!");
    }
    else if (target.className.match(/^vote-down-off.*$/)){
        event.activity = "DownVote!";
        event.tags = tags_of_question;
        console.log("DownVote!");
    }
    else if (target.className === "star-off star-on"){
        event.activity = "BookMark!";
        event.tags = tags_of_question;
    }
    else if (target.className === "star-off"){
        event.activity = "UnBookMark!";
        event.tags = tags_of_question;
    }
    else if (target.className === "suggest-edit-post")
    {
        event.activity = "EditSuggest!";
        event.tags = tags_of_question;
    }
    else if (target.className === "question-hyperlink") {
        event.activity = "ClickOnQuestion!";
        event.question = target.innerText;
        event.url = event.question;
        event.tags = tags_of_question;
    }
    else if(target.className.match(/^post-tag.*$/)) {
        event.activity = "TagClick!";
        event.tag = target.innerText;
        event.url = event.tag;
    }
    else if (target.className === "page-numbers")
    {
        event.activity = "ChangePage!";
        event.tags = tags_of_question;
    }
    else if (target.value === "Post Your Question") {
        if (document.getElementById("title").value.length)
            event.url = document.getElementById("title").value;
        if(event.title.length>0)
            event.activity = "PostQue!";
    }
    else if (target.value === "Post Your Answer") {
        event.activity = "PostAns!";
        event.question = document.getElementsByClassName("question-hyperlink")[0].innerText;
        event.url= "User is answering the question: "+event.question;
        event.tags = tags_of_question;
    }
    else if ( target.className.match(/^comments-link-.*$/) || target.className === "comment-copy" || target.value === "add a comment")
    {
        event.activity = "ClickComment!";
        event.data = "User clicked on the comment";
        event.tags = tags_of_question;
    }
    if (event.activity) {
        chrome.runtime.sendMessage(event, function(response) {
            console.log(event);
            console.log(response.acknowledgment);
        });
    }
}, false);
