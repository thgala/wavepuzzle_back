var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Media Model
 * ==========
 */
var Media = new keystone.List('Media', {
  map: { name: 'name' }
});

Media.add({
  name: { type: String, required: true },
  url: { type: Types.Url, required: true, initial: true },
  image_url: { type: Types.Url, required: true, initial: true },
  caption: { type: Types.Html }
});

// Provide access to Keystone
Media.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});


/**
 * Registration
 */
// Media.defaultColumns = 'name, email, isAdmin';
Media.register();
