import Promise from 'bluebird';
import fsExtra from 'fs-extra';
import path from 'path';

Promise.promisifyAll(fsExtra);

function clean() {
  return fsExtra.removeAsync(path.resolve(__dirname + '/../../public'));
}

export default clean;
