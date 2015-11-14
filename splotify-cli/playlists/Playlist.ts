import {spotifyServer} from "../api";

interface PlaylistResult {
    id: string,
    name: string,
    href: string,
    user: string
}

interface TrackResult {
    album: string,
    track: string,
    added: Date,
    list: string
}

function getUserPlaylists(profile: string): Promise<PlaylistResult[]> {
    return spotifyServer.getUserPlaylists(profile);
}

function getTracksForList(list: PlaylistResult) {
    return function (tracks: TrackResult[]) {
        return spotifyServer.getTracksOnPlaylist(list.name, list.href)
                .then(newTracks => tracks.concat(newTracks));
    }
}

function getTracksForLists(lists: PlaylistResult[]): Promise<TrackResult[]> {

    let tracks = [];
    let promise = Promise.resolve(tracks);

    for (var list of lists) {
        promise = promise.then(getTracksForList(list));
    };
  
    return promise;
}

function sortTracks(tracks: TrackResult[]) {
    return tracks.sort((t1, t2) => {
        if (t1.added == t2.added) {
            return 0;
        }
        if (t1.added < t2.added) {
            return -1;
        }
        return 1;
    });
}

function showTracks(tracks: TrackResult[]) {
    tracks.forEach(track => {
        console.log(track.list + " " + track.track + " " + track.album + " "  + track.added.toDateString());
    });
}

export class Playlist {

    constructor(profile: string) {
        this._profile = profile;
    }

    showPlaylists() {
        return getUserPlaylists(this._profile)
            .then(getTracksForLists)
            .then(sortTracks)
            .then(showTracks);    
    }

    _profile: string;

}