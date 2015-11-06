var commander = require("commander");
var playlists_1 = require("./playlists");
var login_1 = require("./login");
var App = (function () {
    function App(args) {
        this._args = args;
        this._commander = commander;
        this._setupCommander();
    }
    App.prototype.run = function () {
        this._commander.parse(process.argv);
    };
    App.prototype.playlists = function (profile) {
        var user = new login_1.User();
        user.login()
            .then(function () {
            var playlist = new playlists_1.Playlist(profile);
            playlist.showPlaylists();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    App.prototype._setupCommander = function () {
        this._commander
            .version("0.0.1");
        this._commander
            .command("playlists [profile]")
            .action(this.playlists.bind(this));
    };
    return App;
})();
var app = new App(process.argv);
app.run();
//# sourceMappingURL=app.js.map