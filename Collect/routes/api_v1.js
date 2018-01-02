"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * API v1
 */
const express = require("express");
const download = require("../tools/download");
const notif = require("../tools/notifcount");
const url = require("url");
const router = express.Router();
router.get('/sites/:domain?', (req, res, next) => {
    var domain = req.params.domain;
    download.ContentDescription.getSaved(function (err, result) {
        if (err) {
            err['status'] = 500;
            err['api'] = true;
            err.message = "Can't read data file";
            delete err.stack;
            return next(err);
        }
        if (domain) {
            result = result.filter(item => item.domain === domain);
        }
        res.status(200).json(result);
    });
});
router.get('/details/:id', (req, res, next) => {
    var id = req.params.id;
    download.ContentDescription.getSaved(function (err, result) {
        if (err) {
            err['status'] = 500;
            err['api'] = false;
            err.message = "Can't read data file";
            return next(err);
        }
        var index = -1;
        if (id) {
            index = result.findIndex(item => item.id === id);
        }
        if (index === -1 || index >= result.length) {
            var err = new Error();
            err['status'] = 404;
            err['api'] = false;
            err.message = "Id not found in saved sites";
            return next(err);
        }
        var item = result[index];
        res.status(200).json(item);
    });
});
router.post('/site/add', (req, res, next) => {
    var posted_url = "";
    try {
        posted_url = req.body.url;
        if (posted_url === null || posted_url === undefined || posted_url == "") {
            throw new Error();
        }
    }
    catch (err) {
        var err = new Error();
        err['status'] = 412;
        err['api'] = true;
        err.message = "Missing parameter \"url\"";
        delete err.stack;
        return next(err);
    }
    var parsed;
    try {
        parsed = url.parse(posted_url);
    }
    catch (err) {
        err['status'] = 422;
        err['api'] = true;
        err.message = "Malformed parameter \"url\"";
        delete err.stack;
        return next(err);
    }
    res.status(202)
        .json({ "message": "Processing started", "target": posted_url });
    console.log("Processing url " + posted_url);
    notif.increaseNotificationCount();
    req.app.get('socketio').emit('url', { "message": "Started processing url", "step": 0, "url": posted_url, "result": null });
    download.website(posted_url, function (err, result, fromCache) {
        notif.decreaseNotificationCount();
        if (err) {
            console.log("Error while processing url " + posted_url + ":\n" + err.stack);
            req.app.get('socketio').emit('url', { "message": "Error while processing url", "step": 4, "url": posted_url, "result": null });
            return console.log(err);
        }
        console.log("Finished url " + posted_url);
        req.app.get('socketio').emit('url', { "message": "Finished processing url", "step": 2, "url": posted_url, "result": result });
    });
});
exports.default = router;
//# sourceMappingURL=api_v1.js.map