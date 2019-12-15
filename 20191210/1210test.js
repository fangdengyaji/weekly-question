/*
 * @Author: feiyi.wf 
 * @Date: 2019-12-14 20:15:21 
 * @Last Modified by: feiyi.wf
 * @Last Modified time: 2019-12-15 12:49:37
 */

const eventLoop = [];
const answerNums = 6;
new Array(answerNums).fill(0).forEach((item, index) => {
    eventLoop.push((res) => {
        console.log(`===============answer${index+1} 开始测试================`);
        const filePath = `./answer${index+1}.js`;
        const cp = require('child_process')
        const path = require('path');
        // Create the child
        const child = cp.fork('./test-case.js', [`${path.join(__dirname, filePath)}`]);
        // Kill after "x" milliseconds
        setTimeout(() => {
            child.kill();
            console.log(`*****************answer${index+1} 进程关闭********************`);
            res();
        }, 10000);
        // Listen for messages from the child
        child.on('message', data => {
            console.log(data);
            res();
            child.kill();
        })
    });
});

function run() {
    if (eventLoop.length > 0) {
        const item = eventLoop.pop();
        new Promise((res) => {
            item(res);
        }).then(() => {
            run();
        });
    } else {
        return;
    }
}
run();
