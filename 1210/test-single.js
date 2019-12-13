// 单个文件测试
console.log(`answer 开始测试`);
const filePath = `./answer1.js`;
const cp = require('child_process')
const path = require('path');
// Create the child
const child = cp.fork('./testCase.js', [`${path.join(__dirname, filePath)}`]);
// Kill after "x" milliseconds
setTimeout(() => {
    child.kill();
    console.log(`answer 测试结束`);
}, 10000);
