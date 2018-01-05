"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("basic-auth");
const crypto = require("crypto");
const fs = require("fs");
const api_path = "/api/v1/";
var config = require('../config.json');
var cookies = require('../cookies.json');
class Cookie {
    constructor(_value) {
        this.value = _value || "random_str";
        this.expires = new Date(Number(new Date()) + cookie_maxage);
        ;
    }
}
// cookies last one week
const cookie_maxage = 7 * 24 * 60 * 60 * 1000;
function isValidCookie(cookie_value) {
    var index = cookies.findIndex(item => item.value === cookie_value);
    if (index === -1) {
        return false;
    }
    var is_expired = cookies[index].expires < new Date();
    if (is_expired) {
        cookies.splice(index, 1);
        return false;
    }
    else {
        return true;
    }
}
function generateCookie(cb) {
    crypto.randomBytes(25, function (err, buffer) {
        if (err) {
            cb(err, null);
            return;
        }
        var cookie = new Cookie(buffer.toString('hex'));
        cb(null, cookie);
        // Save the cookies!
        cookies.push(cookie);
        fs.writeFile('cookies.json', JSON.stringify(cookies));
    });
}
module.exports = function (req, res, next) {
    var user = auth(req);
    var session_cookie = req.cookies["session_id"];
    if (!session_cookie) {
        if (!user || !(user.name === config.username && user.pass === config.password)) {
            if (req.path.startsWith(api_path)) {
                if (req.param("token") === config.api_token) {
                    return next();
                }
                else {
                    return res.status(401).json({ "message": "Access denied. Set a valid \"token\" in your parameters" });
                }
            }
            res.set('WWW-Authenticate', 'Basic realm="auth"');
            res.status(401).send();
            return;
        }
        else {
            generateCookie(function (err, c) {
                if (err) {
                    return next(err);
                }
                res.cookie("session_id", c.value, { expires: c.expires });
                next();
            });
        }
    }
    else {
        if (isValidCookie(session_cookie)) {
            console.log("Valid Cookie");
            next();
        }
        else {
            res.clearCookie("session_id");
            res.set('WWW-Authenticate', 'Basic realm="auth"');
            res.status(401).send();
            return;
        }
    }
};
//# sourceMappingURL=auth.js.map