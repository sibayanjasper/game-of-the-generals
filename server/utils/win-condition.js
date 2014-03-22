/**
 * This encapsulates the logic of checking if a win condition is met.
 *
 * There are two win conditions:
 *   1. If a player's flag reaches the other end of the board
 *   2. If a player's flag is captured
 *
 */

WinCondition = function(boardActual) {
  this._flagLocations = getFlagLocations(boardActual);
 };

_.extend(WinCondition.prototype, {
  getWinnerNum: function() {
    if (!this.isThereWinner()) {
      return null;
    }

    return this.isWinner(1) ? 1: 2;
  },

  isThereWinner: function() {
    return this.isWinner(1) || this.isWinner(2);
  },

  isWinner: function(playerNum) {
    var otherPlayerNum = playerNum === 1 ? 2 : 1;
    return this.isAcrossFlagOf(playerNum) ||
        this.isCapturedFlagOf(otherPlayerNum);
  },

  isAcrossFlagOf: function(playerNum) {
    var goalRowNum = playerNum === 1 ? Coord.MAX_ROW : 0;
    return !_.isNull(this._flagLocations[playerNum]) &&
        this._flagLocations[playerNum].y === goalRowNum;
  },

  isCapturedFlagOf: function(playerNum) {
    return _.isNull(this._flagLocations[playerNum]);
  }
});


function getFlagLocations(boardActual) {
  var retval = {1: null, 2: null};
  for (var coordString in boardActual) {
    var pieceInfo = boardActual[coordString];
    if (pieceInfo.piece === PIECES.FLAG) {
      retval[pieceInfo.owner] = Coord.fromString(coordString);
    }
  }
  return retval;
}