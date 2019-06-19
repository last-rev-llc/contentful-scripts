require('dotenv').config();
const contentfulMgmt = require('contentful-management');
const environment = process.env.CONTENTFUL_ENVIRONMENT;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const clientMgmt = contentfulMgmt.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API,
});

const clientWithEnv = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(spaceId);
      const space = await clientMgmt.getSpace(spaceId).catch(error => console.log(error));
      const env = await space.getEnvironment(environment).catch(error => console.log(error));
      resolve(env);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  environment,
  spaceId,
  clientMgmt,
  clientWithEnv,
}