const res = arr => {

    const len = arr.length;
  
    if (!arr || arr.length === 0) {
  
      return false;
  
    }
  
    if (len === 1) {
  
      return true;
  
    }
  
    let longest = 0;
  
    for (let i = 0; i <= len - 2; i++) {
  
      longest = longest > i + arr[i] ? longest : i + arr[i];
  
      if (longest >= len - 1) {
  
        return true;
  
      } else if (longest === i) {
  
        return false;
  
      }
  
    }
  
    return false;
  
  };

  module.exports = res;