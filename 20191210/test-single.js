/*
 * @Author: feiyi.wf 
 * @Date: 2019-12-14 20:15:35 
 * @Last Modified by:   feiyi.wf 
 * @Last Modified time: 2019-12-14 20:15:35 
 */

// 单个文件测试
console.log(`answer 开始测试`);
const filePath = `./answer1.js`;
const cp = require('child_process')
const path = require('path');
// Create the child
const child = cp.fork('./test-case.js', [`${path.join(__dirname, filePath)}`]);
// Kill after "x" milliseconds
setTimeout(() => {
    child.kill();
    console.log(`answer 测试结束`);
}, 10000);
