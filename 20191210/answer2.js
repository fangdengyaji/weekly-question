/*
 * @Author: feiyi.wf 
 * @Date: 2019-12-14 20:15:09 
 * @Last Modified by:   feiyi.wf 
 * @Last Modified time: 2019-12-14 20:15:09 
 */

/**
 * @title 判断能否达到最终项函数
 * @param {arr} 需要判断的数组
 * @desc 使用分治法来解决此问题 
 */

function canGoFinal(arr) {
    // 当第一项为0时，只有当数组只有一项时才能到最终
    if (arr[0] === 0) {
        if (arr.length < 2) {
            return true;
        }
        return false;
    }
    // 如果第一项可以直达数组最后一项，必能达到最终
    if (arr[0] >= arr.length - 1) {
        return true;
    }

    // 得到除最后一项以外其他项的和
    const sum = arr.reduce((total, value, index) => {
        if (index !== arr.length - 1) {
            return total + value;
        }
        return total;
    }, 0);
    // 如果有理论符合的可能
    if (sum >= arr.length - 1) {
        // 递归判断各个子项
        let result = false;
        for (let index = 1; index <= arr[0]; index++) {
            const newArr = arr.slice(index);
            result = (result || canGoFinal(newArr));
        }
        return result;
    }
    return false;
}
module.exports = canGoFinal;