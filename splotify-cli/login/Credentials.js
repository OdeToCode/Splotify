var inquirer = require("inquirer");
var id = "SPOTIFYID";
var secret = "SPOTIFYSECRET";
var loginQuestions = [
    {
        type: "input",
        name: "username",
        message: "App Id:"
    },
    {
        type: "password",
        name: "password",
        message: "App secret:"
    }
];
var Credentials = (function () {
    function Credentials(username, password) {
        this.username = username;
        this.password = password;
    }
    Credentials.prototype.toBase64 = function () {
        var buffer = new Buffer(this.username + ":" + this.password, "utf-8");
        return buffer.toString("base64");
    };
    Credentials.fromEnvironment = function () {
        if (!process.env[id] || !process.env[secret]) {
            return Credentials.prompt();
        }
        var result = new Credentials(process.env[id], process.env[secret]);
        return Promise.resolve(result);
    };
    Credentials.prompt = function () {
        var completion = new Promise(function (resolve, reject) {
            inquirer.prompt(loginQuestions, function (answers) {
                var result = new Credentials(answers["username"], answers["password"]);
                resolve(result);
            });
        });
        return completion;
    };
    return Credentials;
})();
exports.Credentials = Credentials;
//# sourceMappingURL=Credentials.js.map