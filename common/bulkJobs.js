/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const bulkUnpublish = async ({ items }, contentfulManagementClient) => {
  console.log('STARTING: bulkUnpublish');
  return new Promise(async (resolve, reject) => {
    try {
      const updatedEntries = [];
      if (!items || items.length === 0) return resolve(items);
      for (let i = 0; i < items.length; i++) {
        const entry = items[i];
        const mgmtEntry = await contentfulManagementClient.getEntry(entry.sys.id);
        try {
          if (mgmtEntry.isPublished()) {
            console.log('UNPUBLISHED: ', mgmtEntry.sys.id);
            updatedEntries.push(await mgmtEntry.unpublish());
          } else {
            updatedEntries.push(mgmtEntry);
          }
        } catch (err) {
          console.log(`Could not unpublish: ${mgmtEntry.sys.id}`);
        }
      }
      resolve(updatedEntries);
    } catch (err) {
      reject(err);
    }
  });
};

const bulkDelete = async ({ items }, contentfulManagementClient) => {
  console.log('STARTING: bulkDelete');
  return new Promise(async (resolve, reject) => {
    try {
      const deletedEntries = [];
      if (!items || items.length === 0) return resolve(items);
      for (let i = 0; i < items.length; i++) {
        const entry = items[i];
        const mgmtEntry = await contentfulManagementClient.getEntry(entry.sys.id);
        try {
          if (!mgmtEntry.isPublished()) {
            console.log('DELETED: ', mgmtEntry.sys.id);
            deletedEntries.push(await mgmtEntry.delete());
          }
        } catch (err) {
          console.log(`Could not delete: ${mgmtEntry.sys.id}`, err.message);
        }
      }
      console.log(`Deleted ${deletedEntries.length} entries out of ${items.length}`);
      resolve(deletedEntries);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  bulkUnpublish,
  bulkDelete,
};
