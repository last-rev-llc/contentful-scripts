const _ = require('lodash');
const contentfulMgmt = require('contentful-management');

require('dotenv').config();

// Create a .env file and add the following variables
const environment = process.env.CONTENTFUL_ENVIRONEMNT;
const spaceId = process.env.CONTETNFUL_SPACE_ID;
const clientMgmt = contentfulMgmt.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API,
});

const content_types = [
  'redesignModuleQuote',
  'moduleLogoSlider',
  'panelCustomHtml',
  'modalFeatureMatrix',
  'modalContactByEmail',
  'moduleMap',
  'moduleJobListing',
  'moduleLogoCarousel',
  'moduleThreePromoCard',
  'redesignModuleChatBubbles',
  'modulePressList',
  'redesignComponentCard',
  'modalContactSales',
  'redesignModuleHero',
  'moduleSolutionPartnerListing',
  'componentCtaOpenModal',
  'moduleMediaShowcase',
  'redesignModuleMediaShowcase',
  'panelHeadlineSummaryCta',
  'moduleSampleSizeCalculator',
  'moduleSpeakerCards',
  'moduleCustomerListing',
  'moduleRelatedCustomerStories',
  'logoSlide',
  'moduleThreeCardFeature',
  'modalSignup',
  'moduleThreeIconCallout',
  'modalEmailOptin',
  'moduleEventsListing',
  'redesignModuleCards',
  'moduleTwoCardFeature',
  'componentModal',
  'redesignModuleTabs',
  'modulePanels',
  'moduleAgenda',
  'moduleCustomerShowcase',
  'moduleCarousel',
  'redesignModuleTimeline',
  'componentPromoCard',
  'moduleHeroSplit',
  'modalGdprOptin',
  'panelBulletPoints',
  'componentCtaInternalUrl',
  'modalDxs',
  'moduleResourceListing',
  'componentFormField',
  'moduleSocialButtons',
  'moduleHeroStandard',
  'redesignModuleCircleStats',
  'moduleCenterContent',
  'person',
  'moduleGlossaryScrollPopup',
  'moduleQuote',
  'moduleContentFilterListing',
  'moduleTechPartnerListing',
  'moduleCommonForm',
  'panelForm',
  'panelVideo',
  'componentCtaPlayVideo',
  'componentListItem',
  'componentCtaExternalUrl',
  'moduleCards',
  'moduleGlossaryListing',
  'panelImage',
  'modalBecomePartner',
];


const getClientWithEnv = async (environment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const space = await clientMgmt.getSpace(spaceId);
      const env = await space.getEnvironment(environment);
      resolve(env);
    } catch (error) {
      reject(error);
    }
  });
};

const delay = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => { 
      resolve();
    }, milliseconds);
  });
}

(async () => {
  const env = await getClientWithEnv(environment);
  for (let y = 0; y < content_types.length; y++) {
    const content_type = content_types[y];
    const entries = await env.getEntries({ content_type, limit: 1000 });
    const unlinkedEntries = [];
    for (let x = 0; x < entries.items.length; x++) {
      const entry = entries.items[x];
      const linkedItems = await env.getEntries({
        'links_to_entry': entry.sys.id,
      });

      if (linkedItems.total === 0) {
        console.log(`${entry.sys.updatedAt}, ${entry.isPublished()}, ${content_type}, ${_.replace(_.get(entry, 'fields.internalTitle.en-US', _.get(entry, 'fields.title.en-US', '')), ',', '')}, ${entry.sys.id}`);
        unlinkedEntries.push(entry.sys.id);
      }
      delay(200);
    }
  }
  console.log('done!');
})();

// Get the Content Types
// (async () => {
//   const env = await getClientWithEnv(environment);
//   const cts = await env.getContentTypes();
//   for (let index = 0; index < cts.items.length; index++) {
//     const ct = cts.items[index];
//     console.log(`'${ct.sys.id}',`);
//   }
// })();
