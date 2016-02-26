import bundle from './tasks/bundle';
import serve from './tasks/serve';
import clean from './tasks/clean';
import copyResources from './tasks/copyResources';

const tasks = {
  bundle,
  serve,
  clean,
  copyResources
}

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.log(`[${format(start)}] Starting '${task.name}'...`);
  return task(options).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${format(end)}] Finished '${task.name}' after ${time} ms`);
  });
}

if (process.argv.length > 2) {
  delete require.cache[__filename];
  const moduleName = process.argv[2];
  console.log(`Launching task ${moduleName}`)
  run(tasks[moduleName])
    .then(result => true)
    .catch(error => console.error(error.stack));
}

export default run;
