/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const _ = require('lodash');
const contentful = require('../common/contentful');


module.exports = async (spaceId, environment) => {
  const contentfulManagementClient = await contentful.clientMgmt;
  const contentfulDeliveryClient = await contentful.clientDelivery(spaceId, environment);

  // console.log('contentfulManagementClient', contentfulManagementClient);
  // console.log('contentfulDeliveryClient', contentfulDeliveryClient);

  const contentModels = await contentfulManagementClient.getSpace(spaceId).then(space => space.getContentTypes({ limit: 1000 }));
  const contentTypeIds = _.map(contentModels.items, ct => ct.sys.id);

  for (let index = 0; index < contentTypeIds.length; index++) {
    // eslint-disable-next-line camelcase
    const content_type = contentTypeIds[index];
    const query = {
      content_type,
      limit: 500,
    };
    // eslint-disable-next-line no-await-in-loop
    const results = await contentfulDeliveryClient.getEntries(query).catch(err => console.log(err));
    console.log(`${content_type}, ${results.items.length}`);
  }
  // console.log(JSON.stringify(contentModels, null, 2));
  // const query = {
  //   content_type: 'blogPost',
  //   limit: 1000,
  // };
  // // Query your entries
};
