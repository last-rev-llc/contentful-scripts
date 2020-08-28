/* eslint-disable import/no-extraneous-dependencies */
const contentfulExport = require('contentful-export');
const contentfulImport = require('contentful-import');

require('dotenv').config();

const SPACE_ID = 'o8vbqs3spmqj';
const ENVIRONMENT_ID = 'master';

const exportOptions = {
  spaceId: SPACE_ID,
  managementToken: process.env.CONTENTFUL_MANAGEMENT_API,
  environmentId: ENVIRONMENT_ID,
  skipRoles: true,
  includeDrafts: true,
  skipContentModel: true,
  includeArchived: false,
  skipWebhooks: true,
  queryAssets: ['sys.createdAt[gte]=2020-10-21T00:00:00Z'],
  // queryEntries: [
  //   'sys.createdAt[gte]=2020-10-15T00:00:00Z',
  // ],
  // queryEntries: ['content_type=categoryTopLevel'],
};

// TODO: add mainLink to the Element Nav Link Model

(async () => {
  // // Global
  // const { assets } = await contentfulExport({...exportOptions, queryAssets: ['sys.createdAt[gte]=2020-07-15T00:00:00Z'], queryEntries: ['sys.createdAt[gte]=2020-10-15T00:00:00Z']});
  // const categoryTopLevel = await contentfulExport({...exportOptions, queryEntries: ['content_type=categoryTopLevel']});
  // const categoryItem = await contentfulExport({...exportOptions, queryEntries: ['content_type=categoryItem']});
  // const hf1 = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageHealthFact&limit=200']});
  // const hf2 = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageHealthFact&limit=200&skip=200']});
  // const hf3 = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageHealthFact&limit=200&skip=400']});
  // const hf4 = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageHealthFact&limit=200&skip=600']});
  // const hf5 = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageHealthFact&limit=200&skip=800']});
  const uieCta = await contentfulExport({...exportOptions, queryEntries: ['content_type=uieCta']});
  const elementNavLink = await contentfulExport({...exportOptions, queryEntries: ['content_type=elementNavLink']});
  const layoutSection = await contentfulExport({...exportOptions, queryEntries: ['content_type=layoutSection']});
  const moduleCardGeneral = await contentfulExport({...exportOptions, queryEntries: ['content_type=moduleCardGeneral']});
  const moduleCategoryList = await contentfulExport({...exportOptions, queryEntries: ['content_type=moduleCategoryList']});
  const moduleHero = await contentfulExport({...exportOptions, queryEntries: ['content_type=moduleHero']});
  const pageGeneral = await contentfulExport({...exportOptions, queryEntries: ['content_type=pageGeneral']});
  const moduleLinkList = await contentfulExport({...exportOptions, queryEntries: ['content_type=moduleLinkList']});
  const moduleRichText = await contentfulExport({...exportOptions, queryEntries: ['content_type=moduleRichText']});
  const settingsGlobal = await contentfulExport({...exportOptions, queryEntries: ['content_type=settingsGlobal']});

  const allEntries = [].concat(uieCta.entries, elementNavLink.entries, layoutSection.entries, moduleCardGeneral.entries, moduleCategoryList.entries, moduleHero.entries, pageGeneral.entries, moduleLinkList.entries, moduleRichText.entries, settingsGlobal.entries);
  // console.log(assets);
  await contentfulImport({
    content: {
      // assets,
      entries: allEntries,
    },
    spaceId: '4yx69hifndy8',
    managementToken: process.env.CONTENTFUL_MANAGEMENT_API,
    environmentId: 'master',
  });
})();
