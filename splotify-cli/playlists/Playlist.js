var api_1 = require("../api");
var Playlist = (function () {
    function Playlist(profile) {
        this._profile = profile;
    }
    Playlist.prototype.showPlaylists = function () {
        api_1.spotifyServer.getUserPlaylists(this._profile);
    };
    return Playlist;
})();
exports.Playlist = Playlist;
//# sourceMappingURL=Playlist.js.map