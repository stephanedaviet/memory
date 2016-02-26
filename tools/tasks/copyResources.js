import Promise from 'bluebird';
import fsExtra from 'fs-extra';
import path from 'path';

Promise.promisifyAll(fsExtra);

function copyResources() {
  return fsExtra.mkdirsAsync(path.resolve(__dirname + '/../../public')).then(function() {
    console.log('/public successfully created');
    return fsExtra.copyAsync(path.resolve(__dirname + '/../../src/index.html'), path.resolve(__dirname + '/../../public/index.html'));
  }).then(function() {
    console.log('index.html successfully copied into /public');
    return true;
  }).catch(function(error) {
    console.error(error);
    return error;
  });
}

export default copyResources;
