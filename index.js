//noinspection JSUnusedGlobalSymbols
/**
 * @param layout
 * @returns {JavascriptObjectTemplate}
 * @constructor
 */
var JavascriptObjectTemplate = function(layout) {
    if (typeof layout !== 'object') {
        throw new Error('Template is not an object');
    }

    var data = require('util')._extend({} ,layout);

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param selector
     * @returns {*}
     */
    this.get = function(selector) {
        if (typeof selector !== 'string') {
            return null;
        }

        var a = data;

        var key = selector.split('.');

        for (var i in key) {
            if (!key.hasOwnProperty(i)) continue;
            if (a[key[i]] == null) {
                return null;
            }
            a = a[key[i]];
        }

        return a;
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param selector
     * @param value
     */
    this.set = function(selector, value) {
        if (typeof selector !== 'string') {
            return false;
        }

        var a = data;
        var b = layout;

        var key = selector.split('.'), keyParts = key.length;

        for (var i = 0; i < keyParts; i++) {
            if (a[key[i]] === undefined || a[key[i]] === undefined) {
                return false;
            }

            if (i == keyParts - 1) {
                if (typeof a[key[i]] == typeof value || b[key[i]] == null) {
                    a[key[i]] = value;
                }
            } else {
                a = a[key[i]];
                b = b[key[i]];
            }
        }

        return true;
    };

    return this;
};

module.exports = JavascriptObjectTemplate;