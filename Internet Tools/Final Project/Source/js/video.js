//Very similar to the gallery.js script however this one gets a single youtube video off www.reddit.com/r/lectures

//DOM elements
var container = document.getElementById("giveVideo");
var header = document.getElementById("videoTitle");
var link = document.getElementById("videoLink");

//Use the fetch json link again.
fetchJSON("https://www.reddit.com/r/lectures/top.json?sort=top&time=day",
    function(error, data) {
        if (error != null)
            console.log("Something wrong");
        else {
            var posts = data.data.children;
            var url;
            var title;
            var permalink;
            //Look through the posts, if it has a valid link, post it
            for (i = 0; i < posts.length; i++) {
                url = posts[i].data.url; //change to domain later
                if (verifyVideoLink(url)) { //Verify that it is a youtube link
                    title = posts[i].data.title;
                    permalink = posts[i].data.permalink;
                    break;
                }
            }

            //Updating the tag, using youtube's embed iframe syntax.
            header.innerHTML = title;
            container.innerHTML = "<iframe src=\"" + url.replace("watch?v=", "embed/") + "\"></iframe>"
            link.innerHTML = "<a href=\"http://www.reddit.com" + permalink + "\" class=\"videoLink\">Join the Discussion on This Video</a>"

        }
    });
