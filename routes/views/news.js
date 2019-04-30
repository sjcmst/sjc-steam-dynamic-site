var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'news';
	locals.filters = {
		news: req.params.news,
	};
	locals.data = {
		posts: [],
	};

	// Load the current news
	view.on('init', function (next) {

		var q = keystone.list('News').model.findOne({
			state: 'published',
			slug: locals.filters.news,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.news = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('News').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.allnews = results;
			next(err);
		});

	});

	// Render the view
	view.render('news');
};
