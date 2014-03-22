function PositionBoard() {
  this._dep = new Deps.Dependency();
  this._board = RandomPosition.generate();
}

_.extend(PositionBoard.prototype, BoardControllerInterface, {
  pieceAt: function(coordString) {
    this._dep.depend();
    return this._board[coordString];
  },

  isDraggable: function(coordString) {
    return coordString in this._board;
  },

  getSquaresToHighlight: function(from) {
    return [from];
  },

  move: function(from, dest) {
    if (Coord.fromString(dest).y > 2) {
      return;
    }

    if (dest in this._board) {
      this._swap(from, dest);
    } else {
      this._transfer(from, dest);
    }

    this._dep.changed();
  },

  _swap: function(from, dest) {
    var temp = this._board[from];
    this._board[from] = this._board[dest];
    this._board[dest] = temp;
  },

  _transfer: function(from, dest) {
    this._board[dest] = this._board[from];
    delete this._board[from];
  },

  random: function() {
    this._board = RandomPosition.generate();
    this._dep.changed();
  },

  getBoard: function() {
    return this._board;
  }
});

positionBoard = new PositionBoard();
