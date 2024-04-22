const APIContoroller = (function() {
    const clientId = "ab82b5b07ecb4e308a4ecc406c86b303";
    const clientSecret = "063e94452c624c5dbe4d2b464016b0e1";

    //private methods
    const _getToken = async() => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        })
        const data = await result.json();
        return data.access_token;
    }


    const _getGenres = async(token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=en_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async(token, genreId) => {
        const limit = 10;
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlist?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }
        })

        const data = await result.json();
        return data.playlist.items;
    }

    const _getTracks = async(token, trackEndpoint) => {
        const limit = 10;
        const result = await fetch(`${trackEndpoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async(token, trackEndpoint) => {
        const result = await fetch(`${trackEndpoint}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, trackEndpoint) {
            return _getTracks(token, trackEndpoint);
        },
        getTrack() {
            return _getTrack(token, trackEndpoint);
        }

    }
}());

//UI module
const UIcontroller = (function() {
    //object to hold references to html selectors

    const domeElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSongList: '.song-list'
    }

    //public methods
    return {
        inputFields() {
            return {
                genre: document.querySelector(domeElements.selectGenre),
                playlist: document.querySelector(domeElements.selectPlaylist),
                tracks: document.querySelector(domeElements.divSongList),
                submit: document.querySelector(domeElements.buttonSubmit),
                songDetail: document.querySelector(domeElements.divSongDetail),
            }
        },

        //methods to create select list option
        createGenre(text, value) {
            const html = `<option value=${value}>${text}</option>`;
            document.querySelector(domeElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },
        createPlaylist(text, value) {
            const html = `<option value=${value}>${text}</option>`;
            document.querySelector(domeElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(domeElements.divSongList).insertAdjacentHTML('beforeend', html);
        },
        createTrackDetail(img, title, artist) {
            const detailDiv = document.querySelector(domeElements.divSongDetail);

            detailDiv.innerHTML = '';

            const html =
                `
          <div class="row col-sm-12 px-0">
              <img src="${img}" alt="">        
          </div>
          <div class="row col-sm-12 px-0">
              <label for="Genre" class="form-label col-sm-12">${title}:</label>
          </div>
          <div class="row col-sm-12 px-0">
              <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
          </div> 
          `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },
        resetTrackDetail() {
            this.inputFields().songDetail.innerHTML = "";
        },
        resetTracks() {
            this.inputFields().tracks.innerHTML = "";
            this.resetTrackDetail();
        },
        resetPlaylist() {
            this.inputFields().playlist.innerHTML = "";
            this.resetTracks();
        },
        storeToken(value) {
            document.querySelector(domeElements.hfToken).value = value;
        },
        getStoredToken() {
            return {
                token: document.querySelector(domeElements.hfToken).value
            }
        }
    }
}())

const APPController = (function(UICtrl, APICtrl) {
    const DOMInputs = UICtrl.inputFields();

    //get genres on page load
    const loadGenres = async() => {
        const token = "";
    }
}(UIcontroller, APIContoroller));

UIcontroller.createGenre('post-malone', 'big-boy');
UIcontroller.createPlaylist('post-malone', 'big-boy');
UIcontroller.createTrack(1, 'maluva');
const token = APIContoroller.getToken();
console.log(token);
//console.log(APIContoroller.getGenres(token));