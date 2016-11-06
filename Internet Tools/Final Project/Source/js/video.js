var container = document.getElementById("giveVideo");
var header = document.getElementById("videoTitle");
var link = document.getElementById("videoLink");

fetchJSON("https://www.reddit.com/r/lectures/top.json?sort=top&time=day",
    function(error, data) {
        if (error != null)
            console.log("Something wrong")
        else {
            var posts = data.data.children;
            var url;
            var title;
            var permalink;
            for(i = 0; i < posts.length; i++) {
                url = posts[i].data.url; //change to domain later
                if(verifyVideoLink(url)) { //Verify that it is a youtube link
                    title = posts[i].data.title;
                    permalink = posts[i].data.permalink;
                    break;
                }
            }

            header.innerHTML = title;
            container.innerHTML = "<iframe src=\"" + url.replace("watch?v=", "embed/") + "\"></iframe>"
            link.innerHTML = "<a href=\"http://www.reddit.com" + permalink + "\" class=\"videoLink\">Join the Discussion on This Video</a>"

        }
    });
