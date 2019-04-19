var keystone = require("keystone");

function calStudyingStatus(yearOfAdmission){
    let currentTime = new Date();
    let studentYear = currentTime.getFullYear()-yearOfAdmission;
    if(currentTime.getMonth()>=9){
      studentYear++;
    }
    if(studentYear<=6&&studentYear>0)
      return "Form " + studentYear + " student";
    else if(studentYear>0)
      return "Old boy";
    else
      return "";

}
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

		var q = keystone.list('User').model.findOne({
      hasPublicPage: true,
      slug: req.params.student,
		});

		q.exec(function (err, result) {
			locals.data.student = result;
      if(result)
        if(locals.data.student.yearOfAdmission)
        locals.data.student.studyingStatus = calStudyingStatus(locals.data.student.yearOfAdmission);
      next(err);
		});

	});

    // Render the view
    view.render('student');
};
