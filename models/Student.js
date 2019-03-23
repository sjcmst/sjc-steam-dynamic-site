var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Student Model
 * ==========
 */
var Student = new keystone.List('Student');

Student.add({
	name: { type: Types.Name, required: true, index: true },
	//email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	//password: { type: Types.Password, initial: true, required: true },
}/*, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
}*/);

// Provide access to Keystone
Student.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
//Student.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Student.defaultColumns = 'name';
//Student.defaultColumns = 'name, email, isAdmin';
Student.register();
