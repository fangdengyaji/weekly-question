/*
 * @Author: feiyi.wf 
 * @Date: 2019-12-14 20:14:49 
 * @Last Modified by:   feiyi.wf 
 * @Last Modified time: 2019-12-14 20:14:49 
 */

const flatArray = arr => [].concat.apply([], arr)

const getSourceIndex = (arr, targetIndex, event) => {
    event = event || {
        flag: false,
        cache: [],
    }

    if (event.flag) {
        return
    }

    let res = []

    for (let idx = 0; idx < targetIndex; idx++) {
        if ((targetIndex - idx) <= arr[idx]) {
            res.push(idx)
        }
    }

    res = res.filter(e => !event.cache.includes(e))
    event.cache = event.cache.concat(res)

    if (res.indexOf(0) > -1) {
        // reach end
        event.flag = true
        return res
    } else {
        return flatArray(res.map(idx => getSourceIndex(arr, idx, event)))
    }
}

const canJump = (arr) => arr.length === 1 ? true : getSourceIndex(arr, arr.length - 1).indexOf(0) > -1;
module.exports = canJump;
