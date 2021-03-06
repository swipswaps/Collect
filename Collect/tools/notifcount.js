"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreaseNotificationCount = exports.increaseNotificationCount = exports.setNotificationCount = void 0;
// This module enables us to set, increase or decrease the server-wide notification count
function setNotificationCount(count) {
    global["notif_count"] = count;
}
exports.setNotificationCount = setNotificationCount;
function increaseNotificationCount() {
    setNotificationCount(global["notif_count"] + 1);
}
exports.increaseNotificationCount = increaseNotificationCount;
function decreaseNotificationCount() {
    var current = global["notif_count"];
    setNotificationCount(current > 0 ? current - 1 : 0);
}
exports.decreaseNotificationCount = decreaseNotificationCount;
//# sourceMappingURL=notifcount.js.map