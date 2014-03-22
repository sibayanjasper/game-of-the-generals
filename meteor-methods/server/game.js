Meteor.methods({
  makeMove: function(gameId, from, dest) {
    var game = OngoingGames.findOne(gameId);

    from = ServerCoord.fromString(from, game.userPlayerNum);
    dest = ServerCoord.fromString(dest, game.userPlayerNum);

    var fromString = from.getStringServerView();
    var destString = dest.getStringServerView();

    Validations.validateGame(game);
    Validations.validateMove(fromString, destString, game.boardActual);

    var boardActual = new BoardActual(game.boardActual);
    boardActual.performMove(fromString, destString);

    var updateValues = {
      $set: {
        turn: game.whoseTurnNext,
        boardActual: boardActual.toJson(),
        boardViews: {},
        lastMove: {
          "1": {from: from.getViewOf(1), dest: dest.getViewOf(1)},
          "2": {from: from.getViewOf(2), dest: dest.getViewOf(2)}
        }
      },
      $inc: {
        numMoves: 1
      }
    };
    updateValues.$set.boardViews[game.p1] = boardActual.getViewOf(1);
    updateValues.$set.boardViews[game.p2] = boardActual.getViewOf(2);

    var winCondition = boardActual.getWinCondition();
    if (winCondition.isThereWinner()) {
      var winnerId = game.getPlayerIdFromNum(winCondition.getWinnerNum());
      updateValues.$set.winner = winnerId;

      var message = ArbiterMessages.getWinMessage(winCondition,
          game.getNameFromNum(1), game.getNameFromNum(2));
      updateValues.$push = {
        messages: message
      };
    }

    OngoingGames.update(gameId, updateValues);

    if (winCondition.isThereWinner()) {
      var winnerId = game.getPlayerIdFromNum(winCondition.getWinnerNum());
      var loserId  = game.p1 === winnerId ? game.p2 : game.p1;

      Meteor.users.update(winnerId, {
        $inc: {'game_stats.wins': 1}
      });
      Meteor.users.update(loserId, {
        $inc: {'game_stats.loses': 1}
      });
    }
  },

  setInitialPosition: function(gameId, board) {
    var game = OngoingGames.findOne(gameId);

    Validations.validateGame(game);
    Validations.validateCanSetInitialPosition(game.isUserDonePositioning);
    Validations.validateInitialPosition(board);

    var updateValues = {$set: {}};
    updateValues.$set['donePositioning.' + Meteor.userId()] = true;

    if (game.isOpponentDonePositioning) {
      game.boardViews[Meteor.userId()] = board;
      var view1 = game.boardViews[game.getPlayerIdFromNum(1)];
      var view2 = game.boardViews[game.getPlayerIdFromNum(2)];
      var boardActual = BoardActual.fromInitialPositions(view1, view2);

      updateValues.$set.boardActual = boardActual.toJson();
      updateValues.$set['boardViews.' + game.p1] = boardActual.getViewOf(1);
      updateValues.$set['boardViews.' + game.p2] = boardActual.getViewOf(2);
    } else {
      updateValues.$set['boardViews.' + Meteor.userId()] = board;
    }

    OngoingGames.update(gameId, updateValues);
  }
});
