import {Credentials} from "./Credentials";
import {spotifyServer} from "../api";

let getAccessToken = function (credentials: Credentials): Promise<string>{
    return spotifyServer.getToken(credentials.toBase64());       
}

export class User {

    login(): Promise<User> {
        return Credentials.fromEnvironment()
            .then(getAccessToken)
            .then(() => this);
    }
}

