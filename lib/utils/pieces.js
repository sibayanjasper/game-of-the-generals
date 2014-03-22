// The uses of the integer codes assigned here to each piece type
// include storage in the database, filenames of the image files, etc.
PIECES = {
  GENERAL_5: 15, // (1) 5 Star General
  GENERAL_4: 14, // (1) 4 Star General
  GENERAL_3: 13, // (1) 3 Star General
  GENERAL_2: 12, // (1) 2 Star General
  GENERAL_1: 11, // (1) 1 Star General
  COLONEL_2: 10, // (1) Colonel
  COLONEL_1: 9,  // (1) Lt. Colonel
  MAJOR:     8,  // (1) Major
  CAPTAIN:   7,  // (1) Captain
  LIEUT_2:   6,  // (1) 1st Lieutenant
  LIEUT_1:   5,  // (1) 2nd Lieutenant
  SERGEANT:  4,  // (1) Sergeant
  PRIVATE:   3,  // (6) Privates
  SPY:       2,  // (2) Spies
  FLAG:      1   // (1) Flag
};


// These are all the piece codes where the multiplicity is
// the number of the corresponding piece at the start of the game.
PIECE_CODES = [
  15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
  5, 4, 3, 3, 3, 3, 3, 3, 2, 2, 1
];


// These piece codes are only used in board views.
VIEW_PIECES = {
  UNKNOWN: 20, // Used in board views to obscure enemy piece
  WAITING: 21, // Used ONLY in the client for latency compensation

  LEFT:    22, // The following are used in board views
  RIGHT:   23, // to mark the previous move.
  UP:      24,
  DOWN:    25
};
