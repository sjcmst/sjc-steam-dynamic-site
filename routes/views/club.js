var keystone = require("keystone");

exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;

    //set locals
    locals.section = "club";
    // locals.filters = {
    //     club: req.params.club,
    // };
    locals.data = {};


    // Load the current club
	view.on('init', function (next) {

		var q = keystone.list('Club').model.findOne({
			state: 'published',
			//slug: locals.filters.club,
            slug: req.params.club,
		}).populate('author club');

		q.exec(function (err, result) {
			locals.data.club = result;
			next(err);
		});

	});

    // Render the view
    view.render('club');
};
