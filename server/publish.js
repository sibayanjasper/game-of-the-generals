Meteor.publish('onlineUsersData', function() {
  var condition = {
    "services.resume.loginTokens": {
      $not: {$size: 0}
    }
  };

  var fields = {username: true, game_stats: true, challenges: true};

  return Meteor.users.find(condition, {fields: fields});
});

Meteor.publish('currGame', function() {
  var condition = {
    $and: [
      {$or: [{p1: this.userId}, {p2: this.userId}]}, // I am a player
      {left: {$ne: this.userId}} // and I haven't already left
    ]
  };

  var fields = {
    p1: true, p2: true, turn: true,
    donePositioning: true,
    messages: true, left: true, winner: true,
    lastMove: true
  };

  var boardViewOfUser = 'boardViews.' + this.userId;
  fields[boardViewOfUser] = true;

  return OngoingGames.find(condition, {fields: fields});
});
