import {spotifyServer} from "../api";

export class Playlist {

    constructor(profile: string) {
        this._profile = profile;
    }

    showPlaylists() {
        spotifyServer.getUserPlaylists(this._profile);
    }

    _profile: string;

}