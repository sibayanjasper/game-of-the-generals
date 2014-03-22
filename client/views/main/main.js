Template.user_info.helpers({
  gravatar_url: function() {
    var mail = Meteor.user().emails ? Meteor.user().emails[0].address : "none";
    var hash = CryptoJS.MD5(mail.trim().toLowerCase()).toString();
    var head = "http://www.gravatar.com/avatar/";
    var tail = "?d=retro&s=150";
    return head + hash + tail;
  }
});

Template.user_info.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});


Template.online_players.players = function() {
  var from = Meteor.user().challenges.from;
  var to   = Meteor.user().challenges.to;

  return Meteor.users.find({
    _id: {
      $ne: Meteor.userId(),
      $nin: from.concat(to)
    }
  });
};

Template.online_players.events({
  'click button': function(event) {
    Meteor.call('createChallenge', event.target.dataset.id);
  }
});


Template.rcvd_challenges.players = function() {
  return Meteor.users.find({
    _id: {
      $in: Meteor.user().challenges.from
    }
  });
};

Template.rcvd_challenges.events({
  'click button': function(event) {
    var userId = event.target.dataset.id;

    Meteor.call('acceptChallenge', userId);
    Meteor.call('createNewGame', userId);
  }
});

Template.sent_challenges.players = function() {
  return Meteor.users.find({
    _id: {
      $in: Meteor.user().challenges.to
    }
  });
};

Template.sent_challenges.events({
  'click button': function(event) {
    Meteor.call('reclineChallenge', event.target.dataset.id);
  }
});
