const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const TIMEOUT = 5000;

const getAnswers = async () => {
    const dirPath = path.join(__dirname, 'answers');
    const fileNames = (await fs.promises.readdir(dirPath)).filter(fn => fn.endsWith('.js'));
    const answers = fileNames.map(name => ({ p: path.join(dirPath, name), n: name }));
    return answers;
};

const executor = (filepath, args, cb) => {
    return new Promise((resolve, reject) => {
        const child = cp.fork(filepath, args);

        const timer = setTimeout(() => {
            child.kill();
            reject(new Error('Timeout'));
        }, TIMEOUT);

        child.on('exit', e => {
            clearTimeout(timer);
            resolve();
        });
    });
};

const run = async (opts) => {
    const answers = await getAnswers();
    answers.reverse().reduce((chain, answer) => {
        const { n: filename, p: filepath } = answer;

        return chain.finally(() => {
            console.log(`***** ${filename} 开始测试 *****`);
            const p = executor('./test-case.js', [filepath])
                .catch(err => {
                    if (err.message === 'Timeout') {
                        console.log('execute timeout');
                    } else {
                        console.error(err);
                    }
                })
                .finally(() => {
                    console.log(`***** ${filename} 结束测试 *****`);
                });

            return p;
        });
    }, Promise.resolve());
};

run();
