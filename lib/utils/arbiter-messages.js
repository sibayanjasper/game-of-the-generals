ArbiterMessages = {
  getWinMessage: function(winCondition, p1name, p2name) {
    if (winCondition.isAcrossFlagOf(1)) {
      return this.getFlagAcross(p1name);
    } else if (winCondition.isCapturedFlagOf(1)) {
      return this.getFlagCaptured(p1name);
    } else if (winCondition.isAcrossFlagOf(2)) {
      return this.getFlagAcross(p2name);
    } else if (winCondition.isCapturedFlagOf(2)) {
      return this.getFlagCaptured(p2name);
    }

    return undefined;
  },

  getFlagAcross: function(username) {
    return {
      sender:  "Arbiter",
      message: username + "'s flag has reached across the board."
    };
  },

  getFlagCaptured: function(username) {
    return {
      sender:  "Arbiter",
      message: username + "'s flag has been captured!"
    };
  },

  getNewGame: function() {
    return {
      sender:  "Arbiter",
      message: "I want a nice clean game...from BOTH of you."
    };
  },

  getPlayerLeft: function() {
    return {
      sender:  "Arbiter",
      message: Meteor.user().username + " left the game."
    };
  },

  getPlayerResigned: function() {
    return {
      sender:  "Arbiter",
      message: Meteor.user().username + " resigned!"
    };
  }
};
