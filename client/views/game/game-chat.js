Template.game_chat.helpers({
  messages: function() {
    return CurrentGame.get('messages');
  }
});

Template.game_chat.events({
  'keydown #game-input-message': function(event) {
    if (event.keyCode == 13) {
      Meteor.call('sendMessage', CurrentGame.id, event.target.value);
      event.target.value = "";
    }
  }
});

Template.game_chat.rendered = function() {
  // keep scroll bar at the bottom
  var div = $('.game-messages')[0];
  div.scrollTop = div.scrollHeight;
};