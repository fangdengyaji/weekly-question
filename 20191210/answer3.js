function canReach(target) {
  // 数组、非空、非负整数校验
  if (
    !Array.isArray(target) ||
    !target.length ||
    target.some(item => typeof item !== 'number' || item < 0 || isNaN(item))
  ) {
    throw new Error('请提供一个长度不为0的非负整数数组');
  }

  // 只有一个数字，说明不用跳就到达最后一位了
  if (target.length === 1) {
    return true;
  }

  /**
   * 尾递归函数，具体思路如下：
   *   targetIndex 初始值最后一个位置的 index，也就是：target.length - 1，
   * · 从 0 到 targetIndex - 1 进行扫描，如果某个节点可以到达 targetIndex的位置，
   *   说明该节点可以到达自己和 targetIndex 节点之间的任意节点
   *   因此，这时候可以停止继续扫描，将该节点的index作为新的targetIndex
   *   如果最后的index为0，说明可以串起来到达最后的节点
   *
   * @param {Number} toIndex 目标节点index
   * @return {Number}
   */
  const findIndex = (toIndex) => {
    if (toIndex === 0) return 0;
    for (let i = 0; i < toIndex; i++) {
      if (target[i] + i >= toIndex) return findIndex(i);
    }
    return -1;
  };

  return findIndex(target.length - 1) === 0;
}

module.exports = canReach;