/**
 * The implementation depends on the code values assigned to each
 * piece as defined in the variable PIECES in the lib/utils/piece.js file.
 *
 *
 * Sample call:
 * PieceChallenge.challenge(12, 8);
 * Result:
 * PieceChallenge.DEFENDER_CAPTURED (2)
 *
 * Sample call:
 * PieceChallenge.challenge(14, 2);
 * Result:
 * PieceChallenge.ATTACKER_CAPTURED (1)
 *
 */

PieceChallenge = {};

PieceChallenge.Result = {
  ATTACKER_CAPTURED: 1,
  DEFENDER_CAPTURED: 2,
  BOTH_CAPTURED: 3
};

PieceChallenge.challenge = function(attacker, defender) {
  if (defender === PIECES.FLAG) {
    return PieceChallenge.Result.DEFENDER_CAPTURED;
  }

  if (attacker === defender) {
    return PieceChallenge.Result.BOTH_CAPTURED;
  }

  if (attacker === PIECES.SPY && defender !== PIECES.PRIVATE) {
    return PieceChallenge.Result.DEFENDER_CAPTURED;
  }

  if (defender === PIECES.SPY && attacker !== PIECES.PRIVATE) {
    return PieceChallenge.Result.ATTACKER_CAPTURED;
  }

  if (attacker > defender) {
    return PieceChallenge.Result.DEFENDER_CAPTURED;
  } else if (attacker < defender) {
    return PieceChallenge.Result.ATTACKER_CAPTURED;
  } else {
    // this shouldn't happen
    return PieceChallenge.Result.BOTH_CAPTURED;
  }
};
