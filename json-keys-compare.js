var fs = require('fs');
var util = require('util');
var RSVP = require('rsvp');

module.exports = (function () {
    'use strict';

    function checkIsFile(file) {
        try {
            return fs.lstatSync(file).isFile();
        } catch (e) {
            return false;
        }
    }

    function getJsonKeys(file) {
        return new RSVP.Promise(function (resolve, reject) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    reject(util.format('Error reading file %s: %s', file, err));
                }

                var parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {
                    reject(util.format('Invalid json in file %s: %s', file, e));
                }

                var keys = Object.keys(parsed);
                console.log('file: %s, keys found: %d', file, keys.length);

                resolve(keys);
            });
        });
    }

    function compareKeys(keys1, keys2) {
        return {
            unique1: keys1.filter(function (el) {
                return keys2.indexOf(el) === -1;
            }),
            unique2: keys2.filter(function (el) {
                return keys1.indexOf(el) === -1;
            })
        };
    }

    function compareObjectKeys(json1, json2) {
        return compareKeys(Object.keys(json1), Object.keys(json2));
    }

    function compareJsonFiles(file1, file2) {
        if (!checkIsFile(file1)) {
            return new RSVP.Promise(function (resolve, reject) {
                reject(util.format('Invalid file: %s', file1));
            });
        }

        if (!checkIsFile(file2)) {
            return new RSVP.Promise(function (resolve, reject) {
                reject(util.format('Invalid file: %s', file2));
            });
        }

        return RSVP.all([getJsonKeys(file1), getJsonKeys(file2)]).then(function (res) {
            return compareKeys(res[0], res[1]);
        });
    }

    return {
        compareObjectKeys: compareObjectKeys,
        compareJsonFiles: compareJsonFiles
    };
})();