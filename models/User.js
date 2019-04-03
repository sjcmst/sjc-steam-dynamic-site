var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
function createAutoKey(){

}
var User = new keystone.List('User',{
	autokey: { path: 'slug', from: 'name' , unique: true }
});

User.add({
	name: { type: Types.Name, required: true, index: true},
	hasPublicPage: { type: Boolean, default: false},
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 400 },
	achievement: {type: Types.Html, wysiwyg: true, height: 150 , many: true},
	profilePic: {type: Types.CloudinaryImage},
	yearOfAdmission: {type: Types.Number }
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
