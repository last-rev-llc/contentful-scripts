const csv = require('csv-parser');
const _ = require('lodash');
const fs = require('fs');

const parser = (fileName, options) => {
  return new Promise((resolve, reject) => {
    try {
      const results = [];
      fs.createReadStream(fileName)
        .pipe(csv(options))
        .on('data', data => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const idArray = (fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await parser(fileName, {
        headers: false,
      });
      resolve(_.map(rows, row => row[0]));
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
  parser,
  idArray,
}
