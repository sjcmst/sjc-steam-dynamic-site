var keystone = require("keystone");

exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;

    //set locals
    locals.section = "student";
    // locals.filters = {
    //     student: req.params.student,
    // };
    locals.data = {};


    // Load the current student
	view.on('init', function (next) {

		var q = keystone.list('student').model.findOne({
			state: 'published',
			//slug: locals.filters.student,
            slug: req.params.student,
		});

		q.exec(function (err, result) {
			locals.data.student = result;
			next(err);
		});

	});

    // Render the view
    view.render('student');
};
