var keystone = require("keystone");

exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;

    //set locals
    locals.section = "about";
    locals.data={};

    // Load the projects
    view.on('init', function (next) {

        var q = keystone.list('User').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
            filters: {
                isWebTeam: true,
            },
        })
            .sort('-publishedDate')
            .populate('');

        // if (locals.data.category) {
        //     q.where('categories').in([locals.data.category]);
        // }

        q.exec(function (err, results) {
            locals.data.about = results;
            
            next(err);
        });
    });

    //render view
    view.render('about');
}