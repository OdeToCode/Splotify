import {Credentials} from "./Credentials";
import {spotifyServer} from "../api";

interface LoginResult {
    username: string, 
    accessToken: string
}

let getAccessToken = function (credentials: Credentials): Promise<LoginResult>{
    return spotifyServer.getToken(credentials.toBase64())
        .then(result => {
            return null;
        });
}

export class User {

    login(): Promise<User> {
        return Credentials.prompt()
            .then(getAccessToken)
            .then(loginResult => {
                this._token = loginResult.accessToken;
                this._username = loginResult.username
                return this;
            });
    }


    _token: string;
    _username: string;
}

