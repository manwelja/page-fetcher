const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const path = process.argv[3];

const req = request(url, (error, response, body) => {
  //check if the file exists
  
  fs.access(path, (err)  => {
    if (!err) {
      console.log(`error: ${path} already exists.`);
      return;
    } else {
      //write the file
      fs.writeFile(path, body, (err) => {
        console.log('writing file...');
        if (err) {
          console.log('error:', err);
          return;
        } else {
          //need to put in a write file callback so it won't run until the file is created
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
        }
      });
    }
  });
});
      
//if error fetching page, print message and exit
req.on('error', error => {
  console.log(error);
  process.exit();
});