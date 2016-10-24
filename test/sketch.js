
function uniqueSorted(array) {
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
}

var bases = uniqueSorted([17, 25, 35, 16])
var ratios = uniqueSorted([1.618])

function makeScale (base, ratio) {
  base = base || 1;
  ratio = ratio || 1;
  var o = Object.create({
    at: function (index) {
      return this.base * Math.pow(this.ratio, index);
    }
  }, {
    ratio: { writable: false, configurable: false, value: ratio },
    base: { writable: false, configurable: false, value: base }
  });
  return o;
}

function makeScales(bases, ratios) {
  var scales = [];
  var i = bases.length;
  while (i--) {
    var j = ratios.length;
    while (j--) {
      scales.push(makeScale(bases[i], ratios[j]))
    }
  }
  return scales
}

var smallestBase = bases[0];
var scales = makeScales(bases, ratios)
var msTable = [];
var msTableN = [];


function pushSorted(array, value) {
  if(array.indexOf(value) >= 0) { return array; }
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

function ms(index) {
  var i = scales.length;
  if (index == 0) {
     return smallestBase;
  } else if (index > 0) {
    while (i--) {
      var j = index;
      do {
        pushSorted(msTable, scales[i].at(j));
        j--;
      } while(scales[i].at(j) > smallestBase)
    }
    return msTable[index]
  } else {
    while (i--) {
      var j = index;
      while (scales[i].at(j) < smallestBase) {
        pushSorted(msTableN, scales[i].at(j));
        j++;
      }
    }
    return msTableN[msTableN.length + index]
  }
}

console.log(ms(-9))
console.log(ms(-8))
console.log(ms(-7))
console.log(ms(-6))
console.log(ms(-5))
console.log(ms(-4))
console.log(ms(-3))
console.log(-2, ms(-2))
console.log(-1, ms(-1))
console.log(0, ms(0));
console.log(ms(1));
console.log(ms(2));
console.log(ms(3));
console.log(ms(4));
console.log(ms(5));
console.log(ms(6));
console.log(ms(7));
console.log(ms(8));
console.log(ms(9));
console.log(ms(10));
console.log(ms(11));
console.log(ms(12));
console.log(ms(13));
console.log(ms(14));
console.log(ms(15));
console.log(ms(16));
console.log(ms(17));
console.log(ms(18));
