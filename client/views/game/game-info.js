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
    if (CurrentGame.get('isSettingUp')) {
      return 21;
    } else {
      return _.reduce(pieceCounts, function(sum, count, pieceCode) {
        if (pieceCode < 20) {
          sum += count;
        }
        return sum;
      }, 0);
    }
  };

  getReactiveOpponentPiecesCounts = function() {
    dep.depend();
    if (CurrentGame.get('isSettingUp')) {
      return 21;
    } else if (CurrentGame.get('isPlaying')) {
      return getReactivePieceCount(VIEW_PIECES.UNKNOWN);
    } else if (CurrentGame.get('isDone')) {
      return _.reduce(pieceCounts, function(sum, count, pieceCode) {
        if (pieceCode >= 40) {
          sum += count;
        }
        return sum;
      }, 0);
    }
  };
};

Template.game_info.helpers({
  opponentName: function() {
    return CurrentGame.opponentName;
  },

  numOpponentPiecesLeft: function() {
    return getReactiveOpponentPiecesCounts();
  },

  numPlayerPiecesLeft: function() {
    return getReactivePlayerPiecesCount();
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