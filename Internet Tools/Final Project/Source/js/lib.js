var fetchJSON = function(url, func) {

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "json";
    request.onload = function() {
        var flag = request.status;
        if(flag == 200) // HTTP200 = OK
            func(null, request.response);
        else
            func(flag);
    };
    request.send();
}

function verifyVideoLink(url) {

    if(url.indexOf("youtube") !== -1)
        return true;
    return false;
}

function verifyImageURL(url) {

    if(url.indexOf("jpg") !== -1)
        return true;
    else if(url.indexOf("jpeg") !== -1)
        return true;
    else if(url.indexOf("png") !== -1)
        return true;
    return false;
}
