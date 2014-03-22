/**
 * TODO comment about player 2's coords being flipped
 *
 */

ServerCoord = function(coord, playerNum) {
  this._normalizedCoord = playerNum === 1 ? coord : coord.flip();
};

ServerCoord.fromString = function(coordString, playerNum) {
  return new ServerCoord(Coord.fromString(coordString), playerNum);
};

_.extend(ServerCoord.prototype, {
  getStringViewOf: function(playerNum) {
    return this.getViewOf(playerNum).stringify();
  },

  getViewOf: function(playerNum) {
    return playerNum === 1 ? this._normalizedCoord : this._normalizedCoord.flip();
  },

  getStringServerView: function() {
    return this.getServerView().stringify();
  },

  getServerView: function() {
    return this.getViewOf(1);
  }
});