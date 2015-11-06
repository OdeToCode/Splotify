import * as request from "request-promise";

let accountsBaseUri = "https://accounts.spotify.com/api";

class SpotifyServer {

    getToken(basicCredentials: string) : Promise<any> {
        let options = {
            method: "POST",
            uri: `${accountsBaseUri}/token`,
            form: {
                grant_type: "client_credentials"
            },
            headers: {
                Authorization: `Basic ${basicCredentials}`
            }
        };

        return request(options)
            .then(result => {
                console.log("Logged in");
                console.log(result);
                return result;
            }, error => {
                console.log("Could not log in:");
                console.log("\t" + error.message);
                return Promise.reject(error);
            });
    }
}

export let spotifyServer = new SpotifyServer();