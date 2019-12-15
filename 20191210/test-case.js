const {
    performance
} = require('perf_hooks');

const { readTCFile } = require('./tc');

function crateTestCase() {
    return Array.from({
        length: 10000
    }).map(_ => parseInt(Math.random() * 1000, 10));
}
const len = 50;
const testCase = new Array(len).fill(0).map((item, index) => {
    return crateTestCase();
})
// const testCase = new Array(50).fill([2,3,1,1,4]);

const answerRun = require(process.argv[2]);
const beginTime = performance.now();
testCase.forEach((item, index) => {
    answerRun(item);
});
const endTime = performance.now();


console.log('avgTime', (endTime - beginTime) / len);

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);