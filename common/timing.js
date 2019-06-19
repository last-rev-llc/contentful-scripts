const delay = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => { 
      resolve();
    }, milliseconds);
  });
}

module.exports = {
  delay,
}