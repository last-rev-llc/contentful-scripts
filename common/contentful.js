/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const contentfulMgmt = require('contentful-management');
const contentful = require('contentful');

const clientMgmt = contentfulMgmt.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API,
});

const clientWithEnv = async (spaceId, environment) => {
  const space = await clientMgmt.getSpace(spaceId).catch(error => console.log(error));
  return space.getEnvironment(environment).catch(error => console.log(error));
};


const clientDelivery = (space, environment) => contentful.createClient({
  space,
  environment,
  accessToken: process.env.CONTENTFUL_DELIVERY_API,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
});

module.exports = {
  clientWithEnv,
  clientMgmt,
  clientDelivery,
};
