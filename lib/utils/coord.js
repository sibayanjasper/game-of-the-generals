/**
 * Coord represents an (x, y) location in the game board.
 *
 * Coord can translate to and from a string representation
 * through coord.stringify() and Coord.fromString(), respectively.
 *
 */

Coord = function(x, y) {
  this.x = x;
  this.y = y;
};

Coord.MAX_COL = 8;
Coord.MAX_ROW = 7;

Coord.fromString = function(s) {
  if (s.length != 2) {
    throw new Error("invalid length");
  }

  return new Coord(parseInt(s[0]), parseInt(s[1]));
};

_.extend(Coord.prototype, {
  flip: function() {
    return new Coord(Coord.MAX_COL - this.x, Coord.MAX_ROW - this.y);
  },

  neighbors: function() {
    var candidates = [
      new Coord(this.x - 1, this.y),
      new Coord(this.x + 1, this.y),
      new Coord(this.x, this.y - 1),
      new Coord(this.x, this.y + 1)
    ];

    return _.filter(candidates, function(coord) {
      return coord.valid();
    });
  },

  stringify: function() {
    return this.x + '' + this.y;
  },

  valid: function() {
    return !(_.isNaN(this.x) || _.isNaN(this.y) ||
        this.x < 0 || this.x > Coord.MAX_COL ||
        this.y < 0 || this.y > Coord.MAX_ROW);
  }
});
