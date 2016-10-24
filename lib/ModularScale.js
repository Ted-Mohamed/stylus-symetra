var ArrayHelpers = require('./ArrayHelpers.js');

function Strand(base, ratio) {
  this.base = base || 1;
  this.ratio = ratio || 1;
}

Strand.prototype.at = function (index) { return this.base * Math.pow(this.ratio, index); }

function ModularScale (bases, ratios) {
  bases = ArrayHelpers.uniqueSorted(bases);
  ratios = ArrayHelpers.uniqueSorted(ratios);
  this.root = ArrayHelpers.min(bases);
  this.cache = { 0: this.root };
  this.strands = [];
  var i = bases.length;
  while (i--) {
    var j = ratios.length;
    while (j--) {
      this.strands.push(new Strand(bases[i], ratios[j]))
    }
  }
}

ModularScale.prototype.at = function (index) {
   if (!this.cache[index]) {
    var i = this.strands.length;
    var values = [];
    if (index > 0) {
      while (i--) {
        var j = index;
        do {
          ArrayHelpers.pushSorted(values, this.strands[i].at(j));
          j--;
        } while(this.strands[i].at(j) >= this.root)
      }
      this.cache[index] = values[index];
    } else {
      while (i--) {
        var j = index;
        while (this.strands[i].at(j) < this.root) {
          ArrayHelpers.pushSorted(values, this.strands[i].at(j));
          j++;
        }
      }
      this.cache[index] = values[values.length + index]
    }
  }
  return this.cache[index];
}

module.exports = ModularScale;
