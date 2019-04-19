var keystone = require("keystone");

exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;

    //set locals
    locals.section = "project";
    // locals.filters = {
    //     project: req.params.project,
    // };
    locals.data = {};


    // Load the current project
	view.on('init', function (next) {

		var q = keystone.list('Project').model.findOne({
			state: 'published',
			//slug: locals.filters.project,
            slug: req.params.project,
		}).populate('author club team');

		q.exec(function (err, result) {
			locals.data.project = result;
			next(err);
		});

	});

    // Render the view
    view.render('project');
};
