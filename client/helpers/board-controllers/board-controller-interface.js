BoardControllerInterface = {
  /**
   * Determines whether the square defined by the coordString contains
   * a piece which is currently draggable by the player.
   */
  isDraggable: function(coordString) {
    alert("isDraggable not implemented!");
  },

  /**
   * Performs the move action.
   */
  move: function(from, dest) {
    alert("move not implemented!");
  },

  /**
   * Returns the piece code at the given coordString.
   * This should be a reactive method.
   */
  pieceAt: function(coordString) {
    alert("pieceAt not implemented!");
  },

  /**
   * Determines which squares are to be highlighted when a piece
   * is being dragged.
   *
   * input:  coordString of the source square of the piece being dragged
   * output: an array of coordStrings of the squares to be highlighted
   */
  getSquaresToHighlight: function(coordString) {
    alert("toHighlight not implemented!");
  },
}
