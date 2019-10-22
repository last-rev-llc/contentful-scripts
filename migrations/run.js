const runMigration = require('contentful-migration/built/bin/cli').runMigration;
const path = require('path');

require('dotenv').config();

const options = {
  spaceId: 'imglmb3xms7o',
  accessToken: '',
  environmentId: 'master',
  yes: false,
};

const migrations = async () => {
  
  await runMigration({ ...options, ...{ filePath: path.join(__dirname, './contentModelUpdate.js') } }).catch(err => console.log(err));

};

migrations();
