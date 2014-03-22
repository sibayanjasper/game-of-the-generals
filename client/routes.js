Router.map(function () {
  this.route('main', {
    controller: 'LoggedInController',
    path: '/',
    template: 'main',

    before: function() {
      if (OngoingGames.findOne()) {
        this.redirect(Router.routes.game.path());
        this.stop();
        return;
      }
    }
  });

  this.route('auth', {
    controller: 'BasicController',
    path: '/auth',
    template: 'auth',

    before: function () {
      if (Meteor.user()) {
        this.redirect(Router.routes.main.path());
        this.stop();
        return;
      }
    }
  });

  this.route('game', {
    controller: 'LoggedInController',
    path: '/game',
    template: 'game',

    before: function() {
      if (!OngoingGames.findOne()) {
        this.redirect(Router.routes.main.path());
        this.stop();
        return;
      }
    }
  });
});

BasicController = RouteController.extend({
  layoutTemplate: 'layout',

  waitOn: function() {
    return [
      Meteor.subscribe('currGame'),
      Meteor.subscribe('onlineUsersData')
    ];
  },

  action: function() {
    this.ready() ? this.render() : this.render('loading');
  }
});

LoggedInController = BasicController.extend({
  before: function() {
    if (!Meteor.user()) {
      this.redirect(Router.routes.auth.path());
      this.stop();
      return;
    }
  }
});
