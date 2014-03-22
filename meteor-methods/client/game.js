Meteor.methods({
  /**
   * Assume a valid move will be successful.
   * If there will be a piece challenge replace the destination square
   * with a 'waiting' piece.
   */
  makeMove: function(gameId, from, dest) {
    var game = OngoingGames.findOne(gameId);

    Validations.validateGame(game);
    Validations.validateMove(from, dest, game.userBoardView);

    var boardView = game.userBoardView;
    if (dest in boardView) {
        boardView[dest] = VIEW_PIECES.WAITING;
    } else {
        boardView[dest] = boardView[from];
    }
    delete boardView[from];

    var setValue = {};
    setValue['boardViews.' + Meteor.userId()] = boardView;
    OngoingGames.update(gameId, {$set: setValue});
  },

  setInitialPosition: function(gameId, board) {
  }
});
