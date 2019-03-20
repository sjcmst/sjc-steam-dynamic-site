var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Club Model
 * ==========
 */

var Club = new keystone.List('Club', {
	//map: { name: 'title' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Club.add({
    name: { type: String, required: true},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	//-author: { type: Types.Relationship, ref: 'User', index: true },
	logoImage: { type: Types.CloudinaryImage },
    clubImage: { type: Types.CloudinaryImage },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Club.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Club.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Club.register();
