let ytbModule = (function () {
    let me = {};
    let ulDatos = "";

    let searchUrl = "?part=&key=";

    let request = obj => {
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
    const ytbService = (function ytbServ() {
        let apiData = {};
        apiData.urlbase = "https://www.googleapis.com/youtube/v3/search?";
        apiData.partParam = "id,snippet";
        apiData.paramKey = "AIzaSyDVfHu3pMu2SsX9JVICtAHWRK2tpfY2Mpk";
        apiData.maxResults = 50;

        let methods = {};
        methods.search = function ytbSearch(q) {
            const apiUrl = apiData.urlbase + "&part=" + apiData.partParam + "&key=" + apiData.paramKey + "&q=" + q + "&maxResults=" + apiData.maxResults
            request({ url: apiUrl }).then(
                function (rta) {
                    this.ulDatos.innerHTML = '';
                    JSON.parse(rta).items.forEach(renderData);
                }
            ).catch(function(err){
                alert('Error al consultar ytb, revise la consola para mas información')
                console.log(err);
            });
        }

        function renderData(r) {
            if (r.id.videoId) {
                let datos = this.ulDatos;
                let newLi = document.createElement("li");
                newLi.setAttribute('class', 'list-group-item')

                let spTitle = document.createElement('h6')
                spTitle.innerText = r.snippet.title;
                newLi.appendChild(spTitle);

                let newImg = document.createElement('img');
                newImg.setAttribute('class','img-thumbnail')
                newImg.src = r.snippet.thumbnails.default.url;
                newLi.appendChild(newImg);

                let lnk = document.createElement('a')
                lnk.innerText = "Ver video"
                lnk.href = "https://www.youtube-nocookie.com/embed/" + r.id.videoId;
                lnk.target = '_blank'
                newLi.appendChild(lnk);
                //newLi.innerText = r.snippet.title;
                datos.appendChild(newLi);
            }
        }

        function init() {
            this.ulDatos = document.getElementById("ul-data");
            var txt = document.getElementById('txt-search');
            txt.addEventListener('keyup', function () {
                console.log(this.value)
                ytbModule.search(this.value);
                return false;
            })
        }
        init();
        return methods;
    })();

    me.search = ytbService.search;

    return me;
})();

//ytbModule.search('Undead Killer')