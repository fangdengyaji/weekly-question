function runToLast(dataArr) {
  if (dataArr.length <= 1 || dataArr[0] >= (dataArr.length - 1)) {
    return true
  } else {
    var num = dataArr[0]
    while (num > 0) {
      if (runToLast(dataArr.slice(num))) {
        return true
      } else {
        num--
      }
    }

    if (num <= 0) {
      return false
    }
  }
}

module.exports = runToLast;