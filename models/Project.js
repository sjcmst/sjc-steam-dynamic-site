var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	//map: { name: 'title' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Project.add({
    name: { type: String, required: true},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true, many: true},
	team: { type: Types.Relationship, ref: "Student", many:true},
	projectImage: { type: Types.CloudinaryImage },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
    club: {type: Types.Relationship, ref: 'Club'}
	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Project.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Project.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Project.register();
