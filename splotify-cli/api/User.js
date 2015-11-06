var Credentials_1 = require("./Credentials");
var getAccessToken = function (credentials) {
    console.log(credentials.toBase64());
    return null;
};
var User = (function () {
    function User() {
    }
    User.prototype.login = function () {
        var _this = this;
        return Credentials_1.Credentials.prompt()
            .then(getAccessToken)
            .then(function (loginResult) {
            _this._token = loginResult.accessToken;
            _this._username = loginResult.username;
            return _this;
        });
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=User.js.map