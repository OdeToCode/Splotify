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
            .then(function (result) {
            // name, href
        });
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
            for (var p in result) {
                console.log(p + ":" + result[p]);
            }
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