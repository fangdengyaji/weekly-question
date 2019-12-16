function canReachEnd(list) {
    let index = list.length - 1;
    let endIndex = index;
    if (index === 0) return true;
    while (index--) {
        if (list[index] + index >= endIndex) {
            if (index === 0) return true
            endIndex = index;
        }
    }
    return false;
}

module.exports = canReachEnd;
