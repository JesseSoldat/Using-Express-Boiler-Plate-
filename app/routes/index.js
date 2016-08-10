'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/list')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/list.html');
    });

	app.route('/login')
		.get(function(req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.post('/login/',
		passport.authenticate('local', {
	    successRedirect: '/list',
	    failureRedirect: '/login'
	  })
	);

	app.route('/register')
		.get(function(req, res){
			res.sendFile(path + '/public/register.html');
		});

	app.post('/register/',
		passport.authenticate('register', {
	    successRedirect: '/list',
	    failureRedirect: '/register'
	  })
	);

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});
};
