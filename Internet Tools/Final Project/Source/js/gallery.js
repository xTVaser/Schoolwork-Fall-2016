var galleryContainer = document.getElementById("gallery");
var currentRow = 0;
var currentRowDOM;

fetchJSON("https://www.reddit.com/r/earthporn/top.json?sort=top&time=day",
    function(error, data) {
        if (error != null)
            console.log("Something wrong")
        else {
            var posts = data.data.children;
            var countPosted = 0;
            for(i = 0; (i < posts.length) && countPosted < 12; i++) {

                if(verifyImageURL(posts[i].data.url) == false)
                    continue;

                if(countPosted % 4 == 0) {

                    galleryContainer.innerHTML += "<div class=\"row centered gallery-row\" id=\"currentRow"+currentRow+"\">"
                    currentRowDOM = document.getElementById("currentRow"+currentRow);
                    currentRow++;
                }
                var html = "";
                html += "<div class=\"col-4\">"
                    html += "<div class=\"card\">"
                        html += "<a href=\"http://www.reddit.com" + posts[i].data.permalink + "\">"
                        html += "<img src=\"" + posts[i].data.url + "\"/></a>"
                        html += "<div class=\"card-container\">" + posts[i].data.title + "</div>"
                     html += "</div>"
                 html += "</div>"

                currentRowDOM.innerHTML += html;
                countPosted++;

                if(countPosted % 4 == 0) {

                    galleryContainer.innerHTML += "</div>";
                }
            }
        }
    });
