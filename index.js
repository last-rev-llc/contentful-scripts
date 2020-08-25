const bulkRemoveItems = require('./jobs/bulkRemoveItems');

const environment = 'master';
const spaceId = 'o8vbqs3spmqj';


(async () => {
  // place the job you want to do here
  await bulkRemoveItems(spaceId, environment, 'migrationHealthFact');
  console.log('DONE');
  process.exit(0);
})();
