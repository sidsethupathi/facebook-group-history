module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/group/:group_id', isLoggedIn, function(req, res) {
		res.render('group.ejs', {
			user: req.user,
			group_id: req.param('group_id')
		});
	});

	app.get('/groups', isLoggedIn, function(req, res) {
		res.render('groups.ejs', {
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email,user_groups'}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
			successRedirect: '/groups',
			failureRedirect: '/'
		})
	);

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.redirect('/');
	}

};