var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TextField Model
 * ==========
 */
var TextField = new keystone.List('TextField', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

TextField.add({
  name: { type: String, required: true },
  slug: { type: String, noedit: true },
  text: { type: Types.Html, wysiwyg: true }
});

// Provide access to Keystone
TextField.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});


/**
 * Registration
 */
// User.defaultColumns = 'title, text';
TextField.register();
