/**
 *
 * @param {*} value 元素值
 * @param {*} offset 元素位置
 * @param {*} array 源数组
 * @param {*} dp 标记当前位置是否可达的状态数组
 */
function jump(value, offset, array, dp) {
  // 当前位置已证明不可达，直接返回 false
  if (!dp[offset]) {
    return false;
  }
  // 如果是最后一个元素, 返回 true
  if (offset === array.length - 1) {
    return true;
  }
  // 如果非末尾且为 0, 返回 false
  if (value === 0) {
    return false;
  }
  // 如果非末尾，但是值大于等于剩下的长度, 返回 true
  if (value >= array.length - offset - 1) {
    return true;
  } else {
    // 以最大 step 循环去递归, 只要有一个成功，直接返回 true
    for (let index = value; index > 0; index--) {
      const element = array[offset + index];
      if (jump(element, offset + index, array, dp)) {
        return true;
      }
      // 标记当前值不可达
      dp[offset + index] = false;
    }
    // 递归完都不成功
    return false;
  }
}

function start(array) {
  // 简单判断一下是否为空
  if (!array.length) {
    throw new Error();
  }

  // 长度为 1，直接返回 true
  if (array.length === 1) {
    return true;
  }

  // 如果第一个是 0, 直接返回 false
  if (array[0] === 0) {
    return false;
  }

  // 如果不存在 0, 直接返回 true
  if (!array.includes(0)) {
    return true;
  }

  // 初始化 dp 数组, 表示是否可以到达。默认为 true, 递归的时候跳过已经标记为不能到达的值
  let dp = new Array(array.length).fill(true);

  // 开始跳
  return jump(array[0], 0, array, dp);
}
module.exports = start;
