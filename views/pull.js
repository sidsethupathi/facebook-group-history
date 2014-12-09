var https = require('https'),
    events = require('events'),
    fs = require('fs');

var EventEmitter = require("events").EventEmitter,
    ee = new EventEmitter();

ee.on("someEvent", function(e) {
    url = e.detail;
    https.get(url, function(res) {
        var posts = "";
        res.on('data', function(d) {
            posts += d;
        });

        res.on('end', function(d) {
            posts = JSON.parse(posts);
            for(var p in posts.data) {
                post = posts.data[p];
                if(post.hasOwnProperty("message"))
                    fs.appendFile("posts.txt", post.message, function(err) {});
                ee.emit("someEvent", {
                    detail: posts.paging.next
                });
                
            }


        });
    });
    
});




function displayPost(data) {
            for(var p in data) {
                post = data[p];
                var msg = "";
                if(post.hasOwnProperty("message"))
                    msg = post.message;
                console.log(post_id);

            }
        }

        console.log("starting");
        var token = "?access_token=CAADBCssox2EBAJ8YNptJOZBY131ZAovEJXRo36ihsXy0ADaEtwZBRPDb9Hh4jKIEulvMnbK3ZAYLfVRaua8boFAUnWgIZCriTDsjIpU3eKWNXoeYGN6XWyZAd7VhVmBRVhVkTaDWQ1lCXWgZBFbMFx9zGM2IqzNOHJMFEbL1oI9gK33thnXbp6Q8EYsqCg9kLhSHN3QQt6ZCnp3Hu8gEGeF6";
        var url = "https://graph.facebook.com/v2.2/124362000979401/feed" + token;
       
       https.get(url, function(res) {
            var posts = "";
            res.on('data', function(d) {
                posts += d;
            });

            res.on('end', function(d) {
                posts = JSON.parse(posts);
                console.log(posts.paging.next);
                for(var p in posts.data) {
                    post = posts.data[p];
                    if(post.hasOwnProperty("message"))
                        fs.appendFile("posts.txt", post.message, function(err) {});
                    ee.emit("someEvent", {
                        detail: posts.paging.next
                    });
                    
                }


            });
            /*
            displayPost(data.data);
            var newevent = new CustomEvent("blah", {
                'detail': data.paging.next
            });
            document.dispatchEvent(newevent);
            */
        });


        /*
        document.addEventListener("blah", function(e) {
            var url = e.detail;
            $.get(url, function(data) {
                    displayPost(data.data);
                    var newevent = new CustomEvent("blah", {
                        'detail': data.paging.next
                    });
                    document.dispatchEvent(newevent);
                });
        });
        */