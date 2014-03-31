// args:
//   {
//     winnerId, loserId, resigned  (optional)
//   }
updateWinLoss = function(args) {
  updateWinRecord(args.winnerId);
  updateLossRecord(args.loserId, args.resigned);
};

function updateWinRecord(winnerId) {
  Meteor.users.update(winnerId, {
    $inc: {'game_stats.wins': 1}
  });
}

function updateLossRecord(loserId, resigned) {
  var inc = {'game_stats.loses': 1};
  if (resigned) {
    inc['game_stats.resigns'] = 1;
  }

  Meteor.users.update(loserId, {$inc: inc});
}