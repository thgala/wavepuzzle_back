var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Work Model
 * ==========
 */
var Work = new keystone.List('Work', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Work.add({
  slug: { type: String, noedit: true },
  title: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true },
  tags: { type: Types.Relationship, ref: 'Tag', many: true },
  media: { type: Types.Relationship, ref: 'Media', many: true }
});

// Provide access to Keystone
Work.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});


/**
 * Registration
 */
Work.register();
