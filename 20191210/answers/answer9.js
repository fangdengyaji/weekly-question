const canJump = (arr, target) => {
    target = target == null ? arr.length - 1 : target;

    const lastIdx = arr.lastIndexOf(0, target - 1);

    if (lastIdx === -1) {
        return true;
    } else {
        var idx = -1;
        for (let i = 0; i < lastIdx; i++) {
            const val = arr[i];
            if ((i + val) >= (lastIdx + 1)) {
                idx = i;
                break;
            }
        }

        if (idx > -1) {
            if (idx === 0) {
                return true;
            } else {
                return canJump(arr, idx);
            }
        } else {
            return false;
        }
    }
};

module.exports = canJump;
