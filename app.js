const APIContoroller = (function() {
    const clientId = "";
    const clientSecret = "";

    //private methods
    const _getToken = async() => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        })
        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer' + token }
        })

        const data = await result.json();
        return data.categories.items
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
                genre: document.querySelector(selectGenre),
                playlist: document.querySelector(selectPlaylist),
                tracks: document.querySelector(divSongList),
                submit: document.querySelector(buttonSubmit),
                songDetail: document.querySelector(divSongDetail),
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
        }
    }
}())

UIcontroller.createGenre('post-malone', 'big-boy');
UIcontroller.createPlaylist('post-malone', 'big-boy');
UIcontroller.createTrack(1, 'maluva');
UIcontroller.createTrackDetail('https://static.toiimg.com/thumb/msid-107425764,imgsize-26290,width-400,resizemode-4/107425764.jpg', 'leave before you leave me', 'jonas brothers')