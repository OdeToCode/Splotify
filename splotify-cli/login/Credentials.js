var inquirer = require("inquirer");
var loginQuestions = [
    {
        type: "input",
        name: "username",
        message: "Spotify email:"
    },
    {
        type: "password",
        name: "password",
        message: "Password:"
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