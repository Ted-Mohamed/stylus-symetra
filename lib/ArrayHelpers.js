module.exports = {
  min: function (array) {
    return Math.min.apply(Math, array);
  },

  uniqueSorted: function (array) {
    var i = array.length;
    if (i == 0) { return array; }

    array = array.sort(function (a, b) { return b - a; });
    var output=[];
    while (i--) {
      if (array[i + 1] !== array[i]) {
        output.push(array[i])
      }
    }
    return output;
  },

  pushSorted: function (array, value) {
    array.push(value);
    var i = array.length;
    while (i--) {
      if (array[i] < array[i - 1]) {
        var item = array[i];
        array[i] = array[i - 1];
        array[i - 1] = item;
      }
    }
    return array;
  }
};