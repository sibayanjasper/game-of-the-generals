Template.game.helpers({
  stateMsg: function() {
    if (CurrentGame.get('didUserWin')) {
      return "You won!";

    } else if (CurrentGame.get('didOpponentWin')) {
      return CurrentGame.opponentName + " won";

    } else if (CurrentGame.get('left')) {
      return CurrentGame.getNameFromId(CurrentGame.left) + " left the game.";

    } else if (!CurrentGame.get('isUserDonePositioning')) {
      return "Position your troops";

    } else if (!CurrentGame.get('isOpponentDonePositioning')) {
      return "Waiting for " + CurrentGame.opponentName + " to be ready";

    } else if (CurrentGame.get('isTurnOfUser')) {
      return "Your turn";

    } else if (CurrentGame.get('isTurnOfOpponent')) {
      return CurrentGame.opponentName + "'s turn";

    } else {
      return "This shouldn't happen. Contact lem now.";
    }
  },

  notifMsg: function() {
    return Session.get('gameNotif');
  },

  showSetupButtons: function() {
    return !CurrentGame.get('left') &&
           !CurrentGame.get('isUserDonePositioning') &&
           !CurrentGame.get('isDone');
  },

  showResignButton: function() {
    return CurrentGame.get('isPlaying');
  },

  showLeaveButton: function() {
    return CurrentGame.get('isSettingUp') ||
           CurrentGame.get('isDone');
  }
});

Template.game.events({
  'click #btn-random': function(event) {
    positionBoard.random();
  },

  'click #btn-ready': function(event) {
    Meteor.call('setInitialPosition', CurrentGame.id, positionBoard.getBoard());
  },

  'click #btn-resign': function(event) {
    Meteor.call('resign', CurrentGame.id);
  },

  'click #btn-leave': function(event) {
    Meteor.call('leave', CurrentGame.id);
  }
});
