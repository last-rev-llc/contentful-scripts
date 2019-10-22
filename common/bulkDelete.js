const bulkDelete = async (ids) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < ids.length; i++) {
      try {
        const id = ids[i];
        const entry = await contentfulClient.getEntry(id);
        if(entry.isPublished()) {
          console.log('UNPUBLISHED: ', entry.sys.id);
          await entry.unpublish();
        }
        if(!entry.isArchived()) {
          console.log('ARCHIVED: ', entry.sys.id);
          await entry.archive();
        } else {
          console.log('ALREADY ARCHIVED: ', entry.sys.id);
        }
        timing.delay(200);
      } catch (error) {
        console.log(error);
      }
  })
}