/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const path = require('path');
const { csv, contentful, timing } = require('../common');

const errors = 0;
const itemCounter = 0;
(async () => {
  const contentfulClient = await contentful.clientWithEnv();
  const ids = await csv.idArray(path.join(__dirname, './', 'ids.csv'));
  for (let i = 0; i < ids.length; i++) {
    try {
      const id = ids[i];
      const entry = await contentfulClient.getEntry(id);
      if (entry.isPublished()) {
        console.log('UNPUBLISHED: ', entry.sys.id);
        await entry.unpublish();
      }
      if (!entry.isArchived()) {
        console.log('ARCHIVED: ', entry.sys.id);
        await entry.archive();
      } else {
        console.log('ALREADY ARCHIVED: ', entry.sys.id);
      }
      timing.delay(200);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('DONE!');
})();
