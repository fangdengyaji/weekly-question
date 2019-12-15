/*
 * @Author: feiyi.wf 
 * @Date: 2019-12-14 20:14:40 
 * @Last Modified by: feiyi.wf
 * @Last Modified time: 2019-12-14 20:23:15
 */

function canFinishJump(input) {
    if (!input || !(input instanceof Array)) return '请输入数组格式';

    const proxyArr = input.toString().replace(/,/g, '').split('0');
    if (proxyArr.length <2) {
        return true;
    }
    
    const value = proxyArr.pop();
    if (!value) {
        proxyArr.pop();
    }
    return proxyArr.every((arr) => {
        const targetStr = arr.substr(-9);
        const targetArr = targetStr.split('');
        
        return targetArr.some((num, index) => {
            return num > ( targetArr.length - index);
        })
    });
}

module.exports = canFinishJump;
