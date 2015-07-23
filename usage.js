var jsonKeysCompare = require('./json-keys-compare');

var file1 = process.argv[2] || 'en2.json';
var file2 = process.argv[3] || 'de.json';

(function () {
    'use strict';

    function printResult(compareRes) {
        var hasDifferences = false;
        if (compareRes.unique1 && compareRes.unique1.length) {
            console.warn('unique keysin file %s: %s', file1, compareRes.unique1);
            hasDifferences = true;
        }
        if (compareRes.unique2 && compareRes.unique2.length) {
            console.warn('unique keys in file %s: %s', file2, compareRes.unique2);
            hasDifferences = true;
        }
        if (hasDifferences) {
            console.log('\x07');
        }
    }

    // compareJsonFiles sample
    jsonKeysCompare.compareJsonFiles(file1, file2).then(printResult, function printError(err) {
        console.error(err);
        console.error('\x07');
    });

    // compareObjectKeys sample
    //printResult(jsonKeysCompare.compareObjectKeys(JSON.parse(fs.readFileSync(file1, 'utf8')),
    //    JSON.parse(fs.readFileSync(file2, 'utf8'))));
})();

