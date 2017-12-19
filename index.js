/*

youtube viewer, powered by Yotutube Data Api.
create by Leirbag.

*/
(function () {
    'use strict';

    function httpGet(obj) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(Obj.headers).foreach(key => {
                    xhr.setRequestHeader(key, obj.headers[key])
                })
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status <= 300)
                    resolve(xhr.response);
                else
                    reject(xhr.StatusText);
            }
            xhr.onerror = () => reject(hxr.StatusText)
            xhr.send(obj.body);
        })
    }

    function init() {
        function eventSearch() {
            moduleYoutubeApi.search(this.value);
            return false;
        }

        var textInputSearch = document.getElementById('txt-search');
        textInputSearch.addEventListener('keyup', eventSearch)
    }

    function youtube() {

        let htmlData;
        let jsonData = [];
        let requestParams = {};
        let urlBaseApi = "https://www.googleapis.com/youtube/v3/search?";

        requestParams.part = "id,snippet";
        requestParams.key = "AIzaSyDVfHu3pMu2SsX9JVICtAHWRK2tpfY2Mpk";
        requestParams.maxResults = 50;
        requestParams.q = null;

        function joinSearchParams(q) {
            let params = '';

            requestParams.q = q || requestParams.q;
            for (var key in requestParams) {
                params += "&" + key + "=" + requestParams[key];
            }

            return params;
        };

        function searchYoutube(q) {
            console.log("retriving data from Youtube!");

            const apiUrl = urlBaseApi + joinSearchParams(q);

            function loadJsonData(response) {
                console.log('getting response from Youtube!');

                jsonData = JSON.parse(response).items;
            };

            function catchError(error) {
                alert('Error, revise la consola para mas información')
                console.log(error);
            };

            function loadHtmlData() {
                console.log('Loading data to HTML');

                htmlData = document.createElement("ul");

                let videos = jsonData.filter(function (obj) { return obj.id.videoId; });
                let ytbPlayerUrl = "https://www.youtube-nocookie.com/embed/";

                function processItem(item) {
                    let spanTitle = document.createElement('span');
                    spanTitle.innerText = item.snippet.title;

                    let thumbnailVideo = document.createElement('img');
                    thumbnailVideo.classList.add("img-thumbnail");
                    thumbnailVideo.src = item.snippet.thumbnails.default.url;

                    let viewLink = document.createElement("a");
                    viewLink.innerText = "Ver video";
                    viewLink.href = ytbPlayerUrl + item.id.videoId;
                    viewLink.target = '_blank';

                    let listItem = document.createElement("li");
                    listItem.classList.add('list-group-item');

                    listItem.appendChild(thumbnailVideo);
                    listItem.appendChild(spanTitle);
                    listItem.appendChild(viewLink);

                    htmlData.appendChild(listItem);
                };

                videos.forEach(processItem);

                document.getElementById("ul-data").innerHTML = htmlData.innerHTML;
            };

            httpGet({ url: apiUrl })
                .then(loadJsonData)
                .then(loadHtmlData)
                .catch(catchError);
        }

        

        let methods = {};
        methods.search = searchYoutube;

        return methods;
    }

    const moduleYoutubeApi = youtube();
    
    init();//Attach the event handler
    
    let module = {};
    module.search = moduleYoutubeApi.search;

    return module;
})();

