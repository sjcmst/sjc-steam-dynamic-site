var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	//map: {name:"nameString"},
	//autokey: { path: 'slug', from: 'nameString', unique: true }
});

User.add({
	name: { type: Types.Name, required: true, index: true},
	//nameString: {type: String, required: true},
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 400 },
	achievement: {type: Types.Html, wysiwyg: true, height: 150 , many: true},
	profilePic: {type: Types.CloudinaryImage},
	//yearOfAdmission: {type: Types.Integer}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
