var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tag Model
 * ==========
 */
var Tag = new keystone.List('Tag', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

Tag.add({
  slug: { type: String, noedit: true },
  name: { type: String, required: true }
});

// Provide access to Keystone
Tag.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});


/**
 * Registration
 */
Tag.register();
