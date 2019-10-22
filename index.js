const _ = require('lodash');
const { contentful, timing } = require('./common');
const { bulkUnpublish, bulkDelete } = require('./common/bulkJobs');

const environment = 'content-model-changes';
const spaceId = 'imglmb3xms7o';


(async () => {
  // Sets up the connection
  const contentfulManagementClient = await contentful.clientWithEnv(spaceId, environment);
  const contentfulDeliveryClient = contentful.clientDelivery(spaceId, environment);
  const query = {
    content_type: 'blogPost',
    limit: 1000,
  };
  // Query your entries
  const results = await contentfulDeliveryClient.getEntries(query).catch(err => console.log(err));

  const { total } = results;
  // const totalPages = Math.round(total / 1000);

  // Action on Entries
  // console.log(JSON.stringify(results, null, 2));
  // await bulkUnpublish(results, contentfulManagementClient);
  // await bulkDelete(results, contentfulManagementClient);
  // Promise.all(results.items.map(entry => entry.delete()));
  console.log('DONE');
})();
