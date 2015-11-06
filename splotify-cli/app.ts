import * as commander from "commander";

class App {

    _args: string[];
    _commander: commander.ICommand;    

    constructor(args: string[]) {
        this._args = args;
        this._commander = commander;

        this._commander
            .version("0.0.1");

        this._commander
            .command("playlists [profile]")
            .action(this.playlists.bind(this));
            
    }

    run() {
        this._commander.parse(process.argv);
    }

    playlists(profile) {
        console.log(profile);
    }
}

var app = new App(process.argv);
app.run();