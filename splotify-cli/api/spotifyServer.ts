import * as request from "request-promise";

let apiBaseUri = "https://api.spotify.com/v1";
let accountsBaseUri = "https://accounts.spotify.com/api";

class SpotifyServer {

    getUserPlaylists(username: string) {
        let options = {
            method: "GET",
            uri: `${apiBaseUri}/users/${username}/playlists`,
            headers: {
                Authorization: this._authHeader
            },
            json: true
        };

        return request(options)
            .then(result => {
                // name, href
            });
    }

    getToken(basicCredentials: string) : Promise<string> {
        let options = {
            method: "POST",
            uri: `${accountsBaseUri}/token`,
            form: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: `Basic ${basicCredentials}`
            },
            json: true
        };

        return request(options)
            .then(result => {
                console.log("Logged in");
                for (let p in result) {
                    console.log(`${p}:${result[p]}`);
                }
                this._authHeader = `Bearer ${result.access_token}`;
                return result;
            }, error => {
                console.log("Could not log in:");
                console.log("\t" + error.message);
                return Promise.reject(error);
            });
    }

    _authHeader: string;
}

export let spotifyServer = new SpotifyServer();