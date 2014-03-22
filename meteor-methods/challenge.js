/**
 *
 *
 */

Meteor.methods({
  createChallenge: function(userId) {
    Meteor.users.update({_id: userId}, {
      $push: {'challenges.from': this.userId}
    });

    Meteor.users.update({_id: this.userId}, {
      $push: {'challenges.to': userId}
    });
  },

  reclineChallenge: function(userId) {
    Meteor.users.update({_id: userId}, {
      $pull: {'challenges.from': this.userId}
    });

    Meteor.users.update({_id: this.userId}, {
      $pull: {'challenges.to': userId}
    });
  },

  acceptChallenge: function(userId) {
    Meteor.users.update({_id: userId}, {
      $pull: {'challenges.to': this.userId}
    });

    Meteor.users.update({_id: this.userId}, {
      $pull: {'challenges.from': userId}
    });
  }
});

