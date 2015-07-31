// Alias
if(typeof navigator === 'undefined') {
    var navigator = {
        appName: 'Firefox'
    };
}

// Make compatible with FF addon sdk
const { Cc, Ci, Cu, components } = require("chrome");
const { viewFor } = require("sdk/view/core");
var window = viewFor(require("sdk/windows").browserWindows[0]);
var navigator = window.navigator;
var crypto = window.crypto;
var setTimeout = window.setTimeout;
var setInterval = window.setInterval;
