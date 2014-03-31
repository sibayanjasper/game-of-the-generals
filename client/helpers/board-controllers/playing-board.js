PlayingBoard = function() {

};

_.extend(PlayingBoard.prototype, BoardControllerInterface, {
  pieceAt: function(coordString) {
    return CurrentGame.getPieceAt(coordString);
  },

  isDraggable: function(coordString) {
    return CurrentGame.isPlaying &&
        CurrentGame.isTurnOfUser &&
        CurrentGame.doesPieceExistAt(coordString) &&
        CurrentGame.isPieceAtOwnedByUser(coordString);
  },

  getSquaresToHighlight: function(from) {
    var candidates = Coord.fromString(from).neighbors();

    candidates = _.map(candidates, function(coord) {
      return coord.stringify();
    });

    return _.reject(candidates, function(coordString) {
      return CurrentGame.isPieceAtOwnedByUser(coordString);
    });
  },

  move: function(from, dest) {
    Meteor.call('makeMove', CurrentGame.id, from, dest);
  }
});
