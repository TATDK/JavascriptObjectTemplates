var util = require('util');

/**
 * @param layout
 * @returns {JavascriptObjectTemplate}
 * @constructor
 */
var JavascriptObjectTemplate = function(layout) {
    if (typeof layout !== 'object') {
        throw new Error('Template is not an object');
    }

    var data = util._extend({}, layout);
    var that = this;

    /**
     * Get a value.
     *
     * @param selector
     * @returns {*}
     */
    this.get = function(selector) {
        if (typeof selector !== 'string') {
            return undefined;
        }

        var a = data;

        var key = selector.split('.'), keyParts = key.length;

        for (var i = 0; i < keyParts; i++) {
            if (a[key[i]] === undefined || a[key[i]] === undefined) {
                return undefined;
            }

            if (i == keyParts - 1) {
                return a[key[i]];
            } else {
                a = a[key[i]];
            }
        }

        return a;
    };

    /**
     * Set a value.
     *
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
            if (a[key[i]] === undefined || b[key[i]] === undefined) {
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

    /**
     * Merge recursively over object
     *
     * @param {String[]} key
     * @param {*} object
     */
    function recursiveMerge(key, object) {
        if (typeof object !== 'object' || util.isArray(object)) {
            that.set(key.join('.'), object);
        } else {
            for (var i in object) {
                if (!object.hasOwnProperty(i)) continue;
                recursiveMerge(key.concat([i]), object[i]);
            }
        }
    }

    /**
     * Set values from object.
     *
     * @param {Object} object
     */
    this.merge = function(object) {
        if (typeof object !== 'object' || util.isArray(object))
            return false;

        for (var i in object) {
            if (!object.hasOwnProperty(i)) continue;
            recursiveMerge([i], object[i]);
        }

        return true;
    };

    /**
     * Get the object.
     *
     * @returns {Object}
     */
    this.getObject = function() {
        return util._extend({}, data);
    };

    /**
     * Reset template back to layout.
     */
    this.reset = function() {
        data = layout;
    };

    /**
     * Clone object template
     * @returns {JavascriptObjectTemplate}
     */
    this.clone = function() {
        var clone = new JavascriptObjectTemplate(layout);

        clone.merge(data);

        return clone;
    };

    return this;
};

module.exports = JavascriptObjectTemplate;