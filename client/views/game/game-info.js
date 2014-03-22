var MAX_COUNTS = _.countBy(PIECE_CODES);

var dep = new Deps.Dependency();

Template.game_info.created = function() {
  Deps.autorun(function() {
    dep.changed();
    if (CurrentGame) {
      pieceCounts = _.countBy(CurrentGame.get('userBoardView'));
    }
  });

  getReactivePieceCount = function(pieceCode) {
    dep.depend();
    return pieceCounts[pieceCode] || 0;
  };

  getReactivePlayerPiecesCount = function() {
    dep.depend();
    return _.reduce(pieceCounts, function(sum, count, pieceCode) {
      return sum + (pieceCode === VIEW_PIECES.UNKNOWN.toString() ? 0 : count);
    }, 0);
  };
};

Template.game_info.helpers({
  opponentName: function() {
    return CurrentGame.opponentName;
  },

  numOpponentPiecesLeft: function() {
    return CurrentGame.get('isSettingUp') ? 21 :
        getReactivePieceCount(VIEW_PIECES.UNKNOWN);
  },

  numPlayerPiecesLeft: function() {
    return CurrentGame.get('isSettingUp') ? 21 :
        getReactivePlayerPiecesCount();
  },

  pieceCount: function(pieceCode) {
    return CurrentGame.get('isSettingUp') ? MAX_COUNTS[pieceCode] :
        getReactivePieceCount(pieceCode);
  },

  pieceTextColor: function(pieceCode) {
    if (CurrentGame.get('isSettingUp')) {
      return '';
    }

    if (getReactivePieceCount(pieceCode) === 0) {
      return 'text-danger';
    }

    if (getReactivePieceCount(pieceCode) < MAX_COUNTS[pieceCode]) {
      return 'text-warning';
    }

    return '';
  }
});

Template.game_info.rendered = function() {

};