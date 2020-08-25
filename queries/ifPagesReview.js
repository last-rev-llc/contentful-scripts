/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const _ = require('lodash');
const contentful = require('../common/contentful');


module.exports = async (spaceId, environment) => {
  const contentfulDeliveryClient = await contentful.clientDelivery(spaceId, environment);
  const query = {
    content_type: 'page',
    limit: 500,
  };
  // eslint-disable-next-line no-await-in-loop
  const results = await contentfulDeliveryClient.getEntries(query).catch(err => console.log(err));

  for (let index = 0; index < results.items.length; index++) {
    const item = results.items[index];
    const {
      title, slug, modules, type, restrictedUserTypes, allowedUserTypesToLogin, dynamicNavbar,
    } = item.fields;
    console.log(`${title},${slug},${modules.length},${type},${restrictedUserTypes},${allowedUserTypesToLogin},${dynamicNavbar ? dynamicNavbar.length : 0}`);
  }
  // // Query your entries
};
