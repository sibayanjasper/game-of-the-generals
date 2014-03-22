/**
 * Defines a global variable CurrentGame which holds the current game
 * document if it is available, null otherwise.
 *
 * It also adds to the document some convenience methods and more
 * importantly a method get() which makes retrieving a field reactive.
 *
 */

var game;
var dep = new Deps.Dependency();

Meteor.startup(function() {
  Deps.autorun(function() {
    game = OngoingGames.findOne();
    CurrentGame = game ? getCurrGameObj() : null;
    dep.changed();
  });
});

function getCurrGameObj() {
  return _.extend(game, {
    get: function(key) {
      dep.depend();
      return game[key];
    },

    /* board pieces */

    getPieceAt: function(coordString) {
      dep.depend();
      return this.userBoardView[coordString];
    },

    doesPieceExistAt: function(coordString) {
      return coordString in this.userBoardView;
    },

    isPieceAtOwnedByUser: function(coordString) {
      var pieceCode = this.getPieceAt(coordString);
      return pieceCode && pieceCode !== VIEW_PIECES.UNKNOWN;
    },
  });
}
