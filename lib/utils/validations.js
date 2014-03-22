Validations = {
  validateGame: function(game) {
    if (!game) {
      throw new Meteor.Error();
    }

    if (game.p1 !== Meteor.userId() && game.p2 !== Meteor.userId()) {
      throw new Meteor.Error();
    }
  },

  validateResignation: function(game) {
    if (!_.isNull(game.winner)) {
      throw new Meteor.Error();
    }
  },

  validateLeave: function(game) {
    if (game.left === Meteor.userId()) {
      throw new Meteor.Error();
    }
  },

  // board is boardActual when in server and
  //          boardView   when in client
  validateMove: function(from, dest, board) {
    from = Coord.fromString(from);
    dest = Coord.fromString(dest);

    if (!from.valid() || !dest.valid()) {
      throw new Meteor.Error();
    }

    var found = _.findWhere(from.neighbors(), dest);
    if (!found) {
      throw new Meteor.Error();
    }

    if (!(from.stringify() in board)) {
      throw new Meteor.Error();
    }

    var isCapturing = dest.stringify() in board;
    if (isCapturing) {
      if (Meteor.isServer) {
        var fromOwner = board[from.stringify()].owner;
        var destOwner = board[dest.stringify()].owner;
        var isCapturingOwnPiece = fromOwner === destOwner;
      } else if (Meteor.isClient) {
        var isCapturingOwnPiece = board[dest.stringify()] !== VIEW_PIECES.UNKNOWN;
      }

      if(isCapturingOwnPiece) {
        throw new Meteor.Error();
      }
    }
  },

  validateCanSetInitialPosition: function(isUserDonePositioning) {
    if (isUserDonePositioning) {
      throw new Meteor.Error();
    }
  },

  validateInitialPosition: function(board) {
    var pieceCodes = _.values(board).sort(function(a, b) {
      return b - a;
    });
    if (!_.isEqual(PIECE_CODES, pieceCodes)) {
      throw new Meteor.Error();
    }

    var coords = _.map(board, function(p, coord) {
      return Coord.fromString(coord);
    });

    if (_.any(coords, function(coord) { return !coord.valid(); })) {
      throw new Meteor.Error();
    }

    if (_.any(coords, function(coord) { return coord.y > 2})) {
      throw new Meteor.Error();
    }
  }
};
