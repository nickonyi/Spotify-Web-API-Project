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

APIContoroller.getGenres();