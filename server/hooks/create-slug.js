// https://www.npmjs.com/package/slug
const slug = require('slug');
const getUniqueSlug = require('../helper/get-unique-slug');
const { isEmpty } = require('lodash');

module.exports = function (options = {}) {
  return function (hook) {
    options = Object.assign({ field: null, overwrite: false, unique: true }, options);

    if (!options.field || !hook.data[options.field]) return hook;

    // do not overwrite existing slug
    // TODO: we should make that possible and relying on ids for routing instead only on slugs
    // the slug should be there for seo reasons but the id should be what counts
    if (!isEmpty(hook.data.slug) && options.overwrite !== true) return hook;

    return new Promise(resolve => {
      const titleSlug = slug(hook.data[options.field], {
        lower: true
      });
      if (options.unique !== false) {
        getUniqueSlug(hook.service, titleSlug, null, hook.id)
          .then((uniqueSlug) => {
            hook.data.slug = uniqueSlug;
            resolve(hook);
          });
      } else {
        hook.data.slug = titleSlug;
        resolve(hook);
      }
    });
  };
};
