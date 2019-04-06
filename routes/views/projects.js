var keystone = require("keystone");

exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;

    //set locals
    locals.section = "projects";
    locals.data = {};

    // Load the projects
    view.on('init', function (next) {

        var q = keystone.list('Project').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
            filters: {
                state: 'published',
            },
        })
            .sort('-publishedDate')
            .populate('author club');

        // if (locals.data.category) {
        //     q.where('categories').in([locals.data.category]);
        // }

        q.exec(function (err, results) {
            locals.data.projects = results;
            
            //TEST PURPOSES
            console.log(results);
            
            next(err);
        });
    });

    // Render the view
    view.render('projects');
};
