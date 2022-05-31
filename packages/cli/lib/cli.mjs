import { program } from 'commander';
import { isInstallAlfred } from './index.mjs';
import { format } from 'util';
import chalk from 'chalk';
import 'fs';

const sep = chalk.gray("\xB7");
const log = (...args) => {
  const msg = format.apply(format, args);
  console.log(chalk.bgBlue.black(" info "), sep, msg);
};
const fatal = (...args) => {
  if (args[0] instanceof Error)
    args[0] = args[0].message.trim();
  const msg = format.apply(format, args);
  console.error(chalk.bgRed.black(" failed "), sep, msg);
  process.exit(1);
};
const success = (...args) => {
  const msg = format.apply(format, args);
  console.log(chalk.bgGreen.black(" success "), sep, msg);
};
var logger = {
  log,
  fatal,
  success
};

const cli = program.version(require("../package.json").version).name("bin-template");
cli.option("-c, --check", "check is alfred installed").action(() => {
  if (!isInstallAlfred()) {
    logger.log("alfred is not installed");
    process.exit(0);
  }
  logger.log("alfred is installed");
  process.exit(1);
});
program.parse(process.argv);
