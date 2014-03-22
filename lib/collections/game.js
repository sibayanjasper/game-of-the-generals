OngoingGames = new Meteor.Collection('games', {
  transform: function(game) {
    _.extend(game, {
      getPlayerIdFromNum: function(playerNum) {
        return this['p' + playerNum];
      },

      getPlayerNumFromId: function(playerId) {
        return this.p1 === playerId ? 1 : 2;
      },

      getNameFromNum: function(playerNum) {
        return playerNum === this.userPlayerNum ? this.userName :
            this.opponentName;
      },

      getNameFromId: function(playerId) {
        return playerId === this.p1 ? this.getNameFromNum(1) : this.getNameFromNum(2);
      }
    });

    game.id = game._id;

    game.opponentId = game.p1 === Meteor.userId() ? game.p2 : game.p1;
    game.opponentName = Meteor.users.findOne(game.opponentId).username;
    game.opponentPlayerNum = game.getPlayerNumFromId(game.opponentId);

    game.userBoardView = game.boardViews[Meteor.userId()];

    game.activePlayerNum = game.getPlayerNumFromId(game.turn);

    game.userPlayerId  = Meteor.userId();
    game.userName      = Meteor.user().username;
    game.userPlayerNum = game.getPlayerNumFromId(Meteor.userId());

    game.isTurnOfUser = game.turn === Meteor.userId();
    game.isTurnOfOpponent = !game.isMyTurn;

    game.isUserDonePositioning = game.donePositioning[Meteor.userId()];
    game.isOpponentDonePositioning = game.donePositioning[game.opponentId];
    game.areBothPlayersDonePositioning = game.isUserDonePositioning &&
        game.isOpponentDonePositioning;

    game.isSettingUp = !game.areBothPlayersDonePositioning;
    game.isDone = !_.isNull(game.winner);
    game.isPlaying = !game.isDone && !game.isSettingUp;

    game.didUserWin = game.winner === Meteor.userId();
    game.didOpponentWin = game.winner === game.opponentId;

    game.whoseTurnNext = game.turn === game.p1 ? game.p2 : game.p1;

    return game;
  }
});
