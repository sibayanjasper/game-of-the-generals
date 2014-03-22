This is a [meteor](http://meteor.com) implementation of Game of the Generals, a Filipino board game invented by Sofronio H. Pasola, Jr. in 1970.


Getting Started
===============

- Install [meteor](http://meteor.com)
- Install [meteorite](https://github.com/oortcloud/meteorite)
- `mrt install`
- `meteor`


Document structure of OngoingGames Collection
=============================================

    {
      "_id" : "J7fixfrMuCea76y2L",
      "p1" : "Q7TxcMn7",    // id of player 1
      "p2" : "u4fc2sc5",    // id of player 2
      "turn" : "Q7TxcMn7",  // id of active player
      "winner": null,       // id of winner
      "donePositioning" : {"Q7TxcMn7" : true, "u4fc2sc5" : true},
      "boardActual": {"11": {"owner": 1, "piece": 2}, ...},
      "boardViews": {
        "Q7TxcMn7": {"11": 2, ...},
        "u4fc2sc5": {"67": 2, ...},
      },
      "messages": [
        {"sender": "Arbiter", "message": "I want ice cream"},
        ...
      ]
    }

Board Actual
------------

This represents the _true view_ of the board.

Keys are 2 character strings representing (x,y) coordinates in the board. Columns go from 0 to 8. Rows go from 0 to 7.

Player 1 starts at rows 0, 1, and 2; while player 2 starts at rows 6, 7, and 8.

Values are the pieces where "owner" is either 1 or 2, representing the player number, and "piece" is the piece code, as defined in lib/utils/pieces.js.

Board View
----------

Since players can only know the location of enemy pieces but not the identity, each player has her own board view.

Pieces are now represented directly using piece codes for the player's own pieces and VIEW\_PIECES.UNKNOWN for enemy pieces.

TODO Also, player 2's view is flipped from board actual.
