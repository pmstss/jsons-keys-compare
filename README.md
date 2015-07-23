# json-keys-compare

Trivial nodejs utility for comparing key sets of two objects that can be passed as JSON files. Used in custom project for tracking consistency of language files.

## Installation
```sh
$ npm install git+https://github.com/pmstss/json-keys-compare.git
```

## Usage
### Command line

```sh
$ git clone https://github.com/pmstss/json-keys-compare
$ cd json-keys-compare
$ npm install
$ node usage.js file1.json file2.json
```

Sample output:

```sh
file: file1.json, keys found: 284
file: file2.json, keys found: 285
unique keys in file file1.json: label.library.categories.more
```

### API

```js
var jsonKeysCompare = require('json-keys-compare');
jsonKeysCompare.compareObjectKeys({a: 1, b: 2}, {a: 1});
// or
jsonKeysCompare.compareJsonFiles(file1, file2);
// return value: 
// {
//     unique1: [array of unique keys for the first file/object],
//     unique2: [array of unique keys for the second file/object]
// }
```

See [usage.js](usage.js)

### Version
0.1.0

License
----
MIT