Template.game_board.created = function() {
  jDraggedPiece = null;
  draggedPieceSource = null;

  Deps.autorun(function() {
    if (CurrentGame) {
      if (CurrentGame.get('isUserDonePositioning')) {
        boardController = new PlayingBoard();
      } else {
        boardController = positionBoard;
      }
    }
  });

  $(window).on('mousemove', function(event) {
    if (jDraggedPiece) {
      jDraggedPiece.css({
        left: event.clientX - 24.5,
        top:  event.clientY - 24.5
      });
    }
  });

  $(window).on('mouseup', function(event) {
    if (jDraggedPiece) {
      $('.gg-square').removeClass('gg-highlight');
      jDraggedPiece.removeClass('gg-dragged');
      jDraggedPiece = null;

      var coord = computeCoordLocation(event.pageX, event.pageY);
      boardController.move(draggedPieceSource, coord.stringify());
    }
  });
};

Template.game_board.helpers({
  rows: function() {
    return [7, 6, 5, 4, 3, 2, 1, 0];
  },

  cols: function(row) {
    var retval = [];
    for (var col = 0; col < 9; col++) {
      retval.push({
        coord: new Coord(col, row).stringify()
      });
    }
    return retval;
  },

  obscure: function() {
    var coord = Coord.fromString(this.coord);
    if (!CurrentGame.get('isUserDonePositioning') && coord.y > 2) {
      return 'gg-obscure';
    } else {
      return '';
    }
  },

  piece: function() {
    return boardController.pieceAt(this.coord);
  },

  lastMoveMarker: function() {
    if (_.isEmpty(CurrentGame.get('lastMove'))) {
      // no move has been made
      return false;
    }

    var lastMove = CurrentGame.get('lastMove')[CurrentGame.get('userPlayerNum')];
    var from = new Coord(lastMove.from.x, lastMove.from.y);
    var dest = new Coord(lastMove.dest.x, lastMove.dest.y);

    if (from.stringify() === this.coord) {
      if (dest.x === from.x + 1) {
        return VIEW_PIECES.RIGHT;
      } else if (dest.x === from.x - 1) {
        return VIEW_PIECES.LEFT;
      } else if (dest.y === from.y + 1) {
        return VIEW_PIECES.UP;
      } else if (dest.y === from.y - 1) {
        return VIEW_PIECES.DOWN;
      }

      // this shouldn't happen
      return VIEW_PIECES.LEFT;
    } else {
      return false;
    }
  }
});

Template.game_board.events({
  'mousedown .gg-piece, mousemove .gg-piece': function(event) {
    event.preventDefault();
  },

  'mousedown .gg-square': function(event) {
    if (boardController.isDraggable(this.coord)) {
      highlight(boardController.getSquaresToHighlight(this.coord));
      beginDragging(this.coord, event.clientX, event.clientY);
    }
  }
});

function highlight(squares) {
  for (var i = 0; i < squares.length; i++) {
    $('#gg-square-' + squares[i]).addClass('gg-highlight');
  }
}

function beginDragging(coord, clientX, clientY) {
  draggedPieceSource = coord;

  jDraggedPiece = $('#gg-square-' + coord).find('.gg-piece');
  jDraggedPiece.addClass('gg-dragged');
  jDraggedPiece.css({
    left: clientX - 24.5,
    top:  clientY - 24.5
  });
}

function computeCoordLocation(clientX, clientY) {
  var offset = $('.gg-board').offset();
  var x = Math.floor((clientX - offset.left) / 49);
  var y = Math.floor((clientY - offset.top)  / 49);
  return new Coord(x, Coord.MAX_ROW - y);
}
