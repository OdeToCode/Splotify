import * as commander from "commander";
import {Playlist} from "./playlists";
import {User} from "./login";

class App {

    constructor(args: string[]) {
        this._args = args;
        this._commander = commander;
        this._setupCommander();        
    }

    run() {
        this._commander.parse(process.argv);
    }

    playlists(profile) {

        let user = new User();
        user.login()
            .then(() => {
                let playlist = new Playlist(profile);
                playlist.showPlaylists();
            })
            .catch(error => {
                console.log(error.message);
            });      
    }

    _setupCommander() {
        this._commander
            .version("0.0.1");

        this._commander
            .command("playlists [profile]")
            .action(this.playlists.bind(this));    
    }

    _args: string[];
    _commander: commander.ICommand;    

}

var app = new App(process.argv);
app.run();