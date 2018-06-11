const spawn = require('child_process').spawn;
const exec = require('child_process').exec
const path = require('path');
const pathToBackup = path.resolve(__dirname, 'data/encompass_test');
const testDb = 'encompass_test';

const restoreDb = function (dbName, backupPath) {
  return new Promise(function (resolve, reject) {
    const args = ['--db', testDb, '--drop', backupPath];
    const mongorestore = spawn('/usr/local/bin/mongorestore', args);
    mongorestore.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    mongorestore.on('error', function (err) {
      reject(err);
    });

    mongorestore.on('exit', function () {
      resolve(`Restored ${dbName} database successfully!`);
    });
  });
};

const dropTestdb = function () {
  return new Promise((resolve, reject) => {
    exec('npm run drop-testdb', (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      console.log('db drop results: ', stdout);
      //console.log('db drop errors: ', stderr);
      resolve('Dropped encompass_test database successfully!');
    });
  });
}

const prepTestDb = async function () {
  try {
    // let dropped = await dropTestdb();
    // console.log(dropped);

    let restored = await restoreDb(testDb, pathToBackup);
    console.log(restored);
  } catch (err) {
    console.log(err);
  }
};
//prepTestDb();
module.exports.prepTestDb = prepTestDb;