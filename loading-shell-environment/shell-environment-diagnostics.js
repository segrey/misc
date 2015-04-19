var child_process = require('child_process');

var PROCESS_WORKING_DIRECTORY = (function() {
  if ('HOME' in process.env) {
    return process.env['HOME'];
  }
  return __dirname;
} ());

var SHELL = (function () {
  if ('SHELL' in process.env) {
    return process.env['SHELL'];
  }
  throw Error('No "SHELL" environment variable specified!');
} ());

function runShell() {
  var args = Array.prototype.slice.call(arguments);
  args = args.concat(['-c', 'printenv | egrep -i \'^NVM_BIN=|^NVM_DIR=|^PATH=\' | sort']);
  console.log('\n[cwd=' + PROCESS_WORKING_DIRECTORY + '] Running ' + SHELL + ' ' + args.join(' '));
  var child = child_process.spawnSync(SHELL, args, {
    cwd: PROCESS_WORKING_DIRECTORY,
    stdio: 'inherit'
  });
  console.log('Child process finished with exit code ' + child.status);
}

console.log('Passed environment');
['NVM_BIN', 'NVM_DIR', 'PATH'].forEach(function (key) {
  console.log(key + '=' + process.env[key]);
});

runShell('-l');
runShell('-i');
runShell('-l', '-i');

