const {
    performance
} = require('perf_hooks');

const { readTCFile } = require('./tc');
const answerRun = require(process.argv[2]);

const run = async () => {
    const result = [];

    await readTCFile('./testcase/small_small_int.bin').then(tc => {
        const beginTime = performance.now();
        tc.forEach((item, index) => {
            const res = answerRun(item);
            result.push(res);
        });
        const endTime = performance.now();

        console.log('avgTime', (endTime - beginTime) / tc.length);

        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

        process.send(JSON.stringify(result));
    });
};

run();