"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.LoggedIn) {
        next();
        return;
    }
    else {
        res.status(403);
        res.send('Not Premitted');
    }
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n    <div>\n    <label>Email</label>\n    <input name=\"email\" />\n    </div>\n    <div>\n    <label>password</label>\n    <input name=\"password\"  type=\"password\" />\n    </div>\n    <button>submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'hi' && password === '12') {
        req.session = { LoggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('invalid eamil or password');
    }
});
router.get('/', function (req, res, requireAuth) {
    if (req.session && req.session.LoggedIn) {
        res.send("\n      <div>\n      <div>you are loggedin </div>\n      <a href=\"/logout\">logout</a>\n      </div>\n      ");
    }
    else {
        res.send("\n      <div>\n      <div>you are not loggedin </div>\n      <a href=\"/login\">login</a>\n      </div>\n      ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('protected route');
});
