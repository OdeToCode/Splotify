var api_1 = require("../api");
function getUserPlaylists(profile) {
    return api_1.spotifyServer.getUserPlaylists(profile);
}
function getTracksForList(list) {
    return function (tracks) {
        return api_1.spotifyServer.getTracksOnPlaylist(list.name, list.href)
            .then(function (newTracks) { return tracks.concat(newTracks); });
    };
}
function getTracksForLists(lists) {
    var tracks = [];
    var promise = Promise.resolve(tracks);
    for (var _i = 0; _i < lists.length; _i++) {
        var list = lists[_i];
        promise = promise.then(getTracksForList(list));
    }
    ;
    return promise;
}
function sortTracks(tracks) {
    return tracks.sort(function (t1, t2) {
        if (t1.added == t2.added) {
            return 0;
        }
        if (t1.added < t2.added) {
            return -1;
        }
        return 1;
    });
}
function showTracks(tracks) {
    tracks.forEach(function (track) {
        console.log(track.list + " " + track.track + " " + track.album + " " + track.added.toDateString());
    });
}
var Playlist = (function () {
    function Playlist(profile) {
        this._profile = profile;
    }
    Playlist.prototype.showPlaylists = function () {
        return getUserPlaylists(this._profile)
            .then(getTracksForLists)
            .then(sortTracks)
            .then(showTracks);
    };
    return Playlist;
})();
exports.Playlist = Playlist;
//# sourceMappingURL=Playlist.js.map