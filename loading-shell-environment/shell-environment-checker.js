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

function spawnSync(command, args) {
  console.log('[cwd=' + PROCESS_WORKING_DIRECTORY + '] Running ' + command + ' ' + args.join(' '));
  var child = child_process.spawnSync(command, args, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('Child process finished with exit code ' + child.status);
}

spawnSync(SHELL, ['-l', '-c', 'printenv | egrep -i \'^NVM_DIR=|^NVM_BIN=|^PATH=\'']);
