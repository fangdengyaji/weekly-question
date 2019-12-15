const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const zlib = require('zlib');

const readFile = promisify(fs.readFile);

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const genSingleTC = (len, range) => {
    const [min, max] = range;
    return Array.from({
        length: len
    }).map(_ => parseInt(getRandomArbitrary(min, max), 10));
};

const writeTCFile = (filename, data) => {
    const str = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        zlib.deflate(str, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                fs.promises.writeFile(filename, buffer)
                    .then(resolve);
            }
        });
    });
};

const readTCFile = (filename) => {
    return readFile(filename)
        .then(buffer => {
            return new Promise((resolve, reject) => {
                zlib.inflate(buffer, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(res.toString()));
                    }
                });
            });
        });
};

const TC_COUNT = 20;
const SMALL_INT = 100;
const BIG_INT = 1000000;

const genTestCases = () => {
    Promise.all([
        writeTCFile('testcase/small_small_int.bin', Array.from({ length: TC_COUNT }).map(() => genSingleTC(SMALL_INT, [0, SMALL_INT]))),
        writeTCFile('testcase/small_big_int.bin', Array.from({ length: TC_COUNT }).map(() => genSingleTC(SMALL_INT, [0, BIG_INT]))),
        writeTCFile('testcase/big_small_int.bin', Array.from({ length: TC_COUNT }).map(() => genSingleTC(BIG_INT, [0, SMALL_INT]))),
        writeTCFile('testcase/big_big_int.bin', Array.from({ length: TC_COUNT }).map(() => genSingleTC(BIG_INT, [0, BIG_INT]))),
    ]).then(() => {
        // readTCFile('testcase/small_small_int.bin').then(console.log);
    });
};

if (process.argv.indexOf('generate') > -1) {
    genTestCases();
}

module.exports = {
    readTCFile,
};
