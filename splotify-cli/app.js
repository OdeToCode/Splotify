var commander = require("commander");
var App = (function () {
    function App(args) {
        this._args = args;
        this._commander = commander;
        this._commander
            .version("0.0.1");
        this._commander
            .command("playlists [profile]")
            .action(this.playlists.bind(this));
    }
    App.prototype.run = function () {
        this._commander.parse(process.argv);
    };
    App.prototype.playlists = function (profile) {
        console.log(profile);
    };
    return App;
})();
var app = new App(process.argv);
app.run();
//# sourceMappingURL=app.js.map