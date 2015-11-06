var request = require("request-promise");
var accountsBaseUri = "https://accounts.spotify.com/api";
var SpotifyServer = (function () {
    function SpotifyServer() {
    }
    SpotifyServer.prototype.getToken = function (basicCredentials) {
        var options = {
            method: "POST",
            uri: accountsBaseUri + "/token",
            form: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: "Basic " + basicCredentials
            }
        };
        return request(options)
            .then(function (result) {
            console.log("Logged in");
            console.log(result);
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