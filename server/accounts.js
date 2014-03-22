Accounts.onCreateUser(function(options, user) {
  user.game_stats = {
    wins:  0,
    loses: 0,
    resigns: 0
  };

  user.challenges = {
    from: [],
    to:   []
  };

  return user;
});

Accounts.validateNewUser(function(user) {
  if (!user.username) {
    throw new Meteor.Error(413, "Username must be specified");
  }

  if (user.username.length < 3) {
    throw new Meteor.Error(413, "Username must have at least 3 characters");
  }

  return true;
});