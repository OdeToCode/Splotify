var request = require("request-promise");
var apiBaseUri = "https://api.spotify.com/v1";
var accountsBaseUri = "https://accounts.spotify.com/api";
var SpotifyServer = (function () {
    function SpotifyServer() {
    }
    SpotifyServer.prototype.getUserPlaylists = function (username) {
        var options = {
            method: "GET",
            uri: apiBaseUri + "/users/" + username + "/playlists",
            headers: {
                Authorization: this._authHeader
            },
            json: true
        };
        return request(options)
            .then(function (result) { return result.items.map(function (r) { return ({
            id: r.id,
            name: r.name,
            href: r.tracks.href,
            user: username
        }); }); });
    };
    SpotifyServer.prototype.getTracksOnPlaylist = function (name, href) {
        var options = {
            method: "GET",
            uri: href,
            headers: {
                Authorization: this._authHeader
            },
            json: true
        };
        return request(options)
            .then(function (result) { return result.items.map(function (item) { return ({
            added: new Date(item.added_at),
            track: item.track.name,
            album: item.track.album.name,
            list: name
        }); }); });
    };
    SpotifyServer.prototype.getToken = function (basicCredentials) {
        var _this = this;
        var options = {
            method: "POST",
            uri: accountsBaseUri + "/token",
            form: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: "Basic " + basicCredentials
            },
            json: true
        };
        return request(options)
            .then(function (result) {
            console.log("Logged in");
            _this._authHeader = "Bearer " + result.access_token;
            return result;
        }, function (error) {
            console.log("Could not log in:");
            console.log("\t" + error.message);
            return Promise.reject(error);
        });
    };
    return SpotifyServer;
})();
exports.spotifyServer = new SpotifyServer();
//# sourceMappingURL=spotifyServer.js.map