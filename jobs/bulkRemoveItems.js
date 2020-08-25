const contentful = require('../common/contentful');
const { bulkUnpublish, bulkDelete } = require('../common/bulkJobs');

module.exports = async (spaceId, environment, contentType) => {
  const contentfulManagementClient = await contentful.clientWithEnv(spaceId, environment);
  const contentfulDeliveryClient = await contentful.clientDelivery(spaceId, environment);
  const query = {
    content_type: contentType,
    limit: 200,
  };
  // eslint-disable-next-line no-await-in-loop
  const results = await contentfulDeliveryClient.getEntries(query).catch(err => console.log(err));
  await bulkDelete(results, contentfulManagementClient);
};
