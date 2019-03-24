var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	//set locals
	locals.section = 'home';
	locals.data = {};
	
	// Load the clubs
    view.on('init', function (next) {

        var q = keystone.list('Club').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
            filters: {
                state: 'published',
            },
        })
            .sort('name');

        // if (locals.data.category) {
        //     q.where('categories').in([locals.data.category]);
        // }

        q.exec(function (err, results) {
            locals.data.clubs = results;
            next(err);
        });
    });
	// Render the view
	view.render('index');
};
