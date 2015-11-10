var Credentials_1 = require("./Credentials");
var api_1 = require("../api");
var getAccessToken = function (credentials) {
    return api_1.spotifyServer.getToken(credentials.toBase64());
};
var User = (function () {
    function User() {
    }
    User.prototype.login = function () {
        var _this = this;
        return Credentials_1.Credentials.fromEnvironment()
            .then(getAccessToken)
            .then(function () { return _this; });
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=User.js.map