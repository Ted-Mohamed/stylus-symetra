var stylus = require('stylus'),
    nodes = stylus.nodes,
    utils = stylus.utils;
var ModularScale = require('./ModularScale.js');

var RATIOS = {
  'Golden Section': (1+ Math.sqrt(5))/2,
  'Minor Second': 1.067,
  'Major Second': 1.125,
  'Minor Third': 1.2,
  'Major Third': 1.25,
  'Perfect Fourth': 1.333,
  'Aug Fourth': 1.414,
  'Perfect Fifth': 1.5,
  'Minor Sixth': 1.6,
  'Major Sixth': 1.667,
  'Minor Seventh': 1.778,
  'Major Seventh': 1.875,
  'Octave': 2,
  'Major Tenth': 2.5,
  'Major Eleventh': 2.667,
  'Major Twelfth': 3,
  'Double Octave': 4
}

var plugin = function() {
    return function(s) {
      var defaultScale = new ModularScale([1], [RATIOS['Golden Section']]);
      var currentScale = null;
      function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

      function setupMS(bases, ratios) {
        bases = utils.unwrap(bases).nodes;
        ratios = utils.unwrap(ratios).nodes;
        var r = [];
        var b = [];

        var i = bases.length;
        while (i--) {
          if (bases[i].nodeName === 'unit') {
            b.push(bases[i].val)
          }
        }

        i = ratios.length;
        while (i--) {
          if (ratios[i].nodeName === 'unit') {
            r.push(ratios[i].val)
          } if (ratios[i].nodeName === 'string') {
            if (RATIOS[ratios[i].string]) {
              r.push(RATIOS[ratios[i].string])
            }
          }
        }

        if (b.length == 0) { b = [1]; }
        if (r.length == 0) { r = [1]; }
        currentScale = new ModularScale(b, r);
      }
      setupMS.raw = true;

      s.define('setup-modular-scale', setupMS);

      s.define('ms', function(index) {
        return new nodes.Unit((currentScale || defaultScale).at(index.val), undefined);
      });
    };
};

module.exports = plugin;
