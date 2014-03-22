/**
 * Calculates a board actual given the initial positions of
 * both players.
 *
 * The result of calculate() is intended to be the value of
 * OngoingGames collection's boardActual field.
 *
 * Sample Call:
 * var initialPos1 = {"00": 9, "21": 7};
 * var initialPos2 = {"40": 5};
 * InitialBoardActual.calculate(initialPos1, initialPos2);
 *
 * Result:
 * {
 *   "00": {owner: 1, piece: 9},
 *   "21": {owner: 1, piece: 7},
 *   "47": {owner: 2, piece: 5},
 * }
 *
 */

InitialBoardActual = function(initialPos1, initialPos2) {
  this._initialPos1 = initialPos1;
  this._initialPos2 = BoardUtils.flipBoard(initialPos2);
};

InitialBoardActual.calculate = function(initialPos1, initialPos2) {
  return new InitialBoardActual(initialPos1, initialPos2)._calculate();
};

_.extend(InitialBoardActual.prototype, {
  _calculate: function() {
    var board1 = this._addOwnership(this._initialPos1, 1);
    var board2 = this._addOwnership(this._initialPos2, 2);
    return _.extend(board1, board2);
  },

  _addOwnership: function(initialPos, playerNum) {
    var retval = {};
    for (var coordString in initialPos) {
      retval[coordString] = {
        owner: playerNum,
        piece: initialPos[coordString]
      };
    }
    return retval;
  }
});
