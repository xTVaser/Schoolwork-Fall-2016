//Simple script to get pictures off of www.reddit.com/r/earthporn

//Gather DOMs
var galleryContainer = document.getElementById("gallery");
var currentRow = 0;
var currentRowDOM;

//Use fetchJSON function defined in lib.js
fetchJSON("https://www.reddit.com/r/earthporn/top.json?sort=top&time=day",
    function(error, data) {
        if (error != null) //If any error occurs, then print out the error.
            console.log("Something wrong")
        else {
            //Otherwise, loop through the posts
            var posts = data.data.children;
            var countPosted = 0;
            //Max of 12 posts
            for (i = 0;
                (i < posts.length) && countPosted < 12; i++) {

                //If the url is not a valid image link, skip it
                if (verifyImageURL(posts[i].data.url) == false)
                    continue;

                //Every 4 images, make a new row.
                if (countPosted % 4 == 0) {
                    //Add a row
                    galleryContainer.innerHTML += "<div class=\"row centered gallery-row\" id=\"currentRow" + currentRow + "\">"
                        //Update dom reference to this new row.
                    currentRowDOM = document.getElementById("currentRow" + currentRow);
                    currentRow++;
                }
                //Otherwise, add the image.
                var html = "";
                html += "<div class=\"col-4\">"
                    html += "<div class=\"card\">"
                        html += "<a href=\"http://www.reddit.com" + posts[i].data.permalink + "\">"
                        html += "<img src=\"" + posts[i].data.url + "\"/></a>"
                        html += "<div class=\"card-container\">" + posts[i].data.title + "</div>"
                    html += "</div>"
                html += "</div>"

                //Add to the HTML
                currentRowDOM.innerHTML += html;
                countPosted++;

                //If we did make a new row, end its tag here.
                if (countPosted % 4 == 0) {

                    galleryContainer.innerHTML += "</div>";
                }
            }
        }
    });
