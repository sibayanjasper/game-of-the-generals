BoardUtils = {
  flipBoard: function(board) {
    var retval = {};
    for (var coordString in board) {
      var newCoord  = Coord.fromString(coordString).flip();
      retval[newCoord.stringify()] = board[coordString];
    }
    return retval;
  }
}