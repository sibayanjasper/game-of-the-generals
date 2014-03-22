Template.auth_signin.error_message = function() {
  return Session.get('signin-errormsg');
};

Template.auth_signin.events({
  'submit #signin-form': function(e, t) {
    e.preventDefault();
    clearAuthErrorMessages();

    var authname = t.find('#signin-authname').value,
        password = t.find('#signin-password').value;

    Meteor.loginWithPassword(authname, password, function(err) {
      if (err) {
        Session.set('signin-errormsg', err.reason);
      }
    });

    return false;
  }
});

Template.auth_register.error_message = function() {
  return Session.get('register-errormsg');
};

Template.auth_register.events({
  'submit #register-form': function(e, t) {
    e.preventDefault();
    clearAuthErrorMessages();

    var username = t.find('#register-username').value,
        emailadd = t.find('#register-emailadd').value,
        password = t.find('#register-password').value,
        confirmp = t.find('#register-confirmp').value;

    if (password != confirmp) {
      Session.set('register-errormsg', 'Passwords do not match');
      return false;
    }

    var hash = {username: username, password: password, email: emailadd};
    var callback = function(err) {
      if (err) {
        Session.set('register-errormsg', err.reason);
      }
    };
    try {
      Accounts.createUser(hash, callback);
    } catch(err) {
      Session.set('register-errormsg', 'Stop joking around');
    }

    return false;
  }
});

function clearAuthErrorMessages() {
  Session.set('signin-errormsg', null);
  Session.set('register-errormsg', null);
}
