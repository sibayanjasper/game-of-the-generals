BoardActual = function(boardActual) {
  this._boardActual = boardActual;
};

BoardActual.fromInitialPositions = function(initPos1, initPos2) {
  return new BoardActual(InitialBoardActual.calculate(initPos1, initPos2));
}

_.extend(BoardActual.prototype, {
  toJson: function() {
    return this._boardActual;
  },

  getViewOf: function(playerNum) {
    var boardView = {};
    for (var coordString in this._boardActual) {
      if (this._boardActual[coordString].owner === playerNum) {
        boardView[coordString] = this._boardActual[coordString].piece;
      } else {
        boardView[coordString] = VIEW_PIECES.UNKNOWN;
      }
    }

    return playerNum === 1 ? boardView : BoardUtils.flipBoard(boardView);
  },

  getBoardRevealFor: function(playerNum) {
    var boardReveal = {};
    _.each(this._boardActual, function(pieceInfo, coordString) {
      if (pieceInfo.owner === playerNum) {
        boardReveal[coordString] = pieceInfo.piece;
      } else {
        boardReveal[coordString] = convertToRevealCode(pieceInfo.piece);
      }
    });

    return playerNum === 1 ? boardReveal : BoardUtils.flipBoard(boardReveal);
  },

  getWinCondition: function() {
    return new WinCondition(this._boardActual);
  },

  performMove: function(from, dest) {
    if (dest in this._boardActual) {
      this.attemptCapture(from, dest);
    } else {
      this.transfer(from, dest);
    }
  },

  attemptCapture: function(from, dest) {
    var attacker = this._boardActual[from].piece;
    var defender = this._boardActual[dest].piece;

    switch (PieceChallenge.challenge(attacker, defender)) {
      case PieceChallenge.Result.ATTACKER_CAPTURED:
        break;
      case PieceChallenge.Result.DEFENDER_CAPTURED:
        this._boardActual[dest] = this._boardActual[from];
        break;
      case PieceChallenge.Result.BOTH_CAPTURED:
        delete this._boardActual[dest];
    }

    delete this._boardActual[from];
  },

  transfer: function(from, dest) {
    this._boardActual[dest] = this._boardActual[from];
    delete this._boardActual[from];
  }

});