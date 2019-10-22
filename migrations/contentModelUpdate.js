const faker = require('faker');
const { get } = require('lodash');

module.exports = (migration) => {
  // const globalSettings = migration.editContentType('globalSettings');
  // globalSettings.editField('mainNavigation', {
  //   validations: [{
  //     linkContentType: [
  //       'link',
  //       'menuLink',
  //     ],
  //   }],
  // });

  // globalSettings.editField('footerNavigation', {
  //   validations: [{
  //     linkContentType: [
  //       'link',
  //       'menuLink',
  //     ],
  //   }],
  // });
  try {
    migration.transformEntriesToType({
      sourceContentType: 'button',
      targetContentType: 'link',
      shouldPublish: true,
      updateReferences: true,
      removeOldEntries: true,
      identityKey() {
        return faker.random.alphaNumeric(24);
      },
      transformEntryForLocale(fromFields, currentLocale) {
        return {
          text: get(fromFields, `text.${currentLocale}`),
          style: 'Button',
          content: get(fromFields, `content.${currentLocale}`),
          url: get(fromFields, `url.${currentLocale}`).indexOf('#') === 0
            ? null
            : get(fromFields, `url.${currentLocale}`),
          pageAnchor: get(fromFields, `url.${currentLocale}`).indexOf('#') === 0
            ? get(fromFields, `url.${currentLocale}`)
            : null,
          target: get(fromFields, `target.${currentLocale}`),
        };
      },
    });
  } catch (err) {
    console.log(err);
  }

  try {
    migration.transformEntriesToType({
      sourceContentType: 'menuItem',
      targetContentType: 'link',
      shouldPublish: true,
      updateReferences: true,
      removeOldEntries: true,
      identityKey() {
        return faker.random.alphaNumeric(24);
      },
      transformEntryForLocale(fromFields, currentLocale) {
        return {
          text: get(fromFields, `text.${currentLocale}`),
          style: 'Link',
          content: get(fromFields, `content.${currentLocale}`),
          url: get(fromFields, `url.${currentLocale}`).indexOf('#') === 0
            ? null
            : get(fromFields, `url.${currentLocale}`),
          pageAnchor: get(fromFields, `url.${currentLocale}`).indexOf('#') === 0
            ? get(fromFields, `url.${currentLocale}`)
            : null,
          target: get(fromFields, `target.${currentLocale}`),
        };
      },
    });
  } catch (err) {
    console.log(err);
  }
};
