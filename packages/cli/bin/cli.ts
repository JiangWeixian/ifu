#!/usr/bin/env node
import { program } from 'commander'
import { isInstallAlfred } from './index'
import logger from './utils/logger'

const cli = program.version(require('../package.json').version).name('bin-template')

cli.option('-c, --check', 'check is alfred installed').action(() => {
  if (!isInstallAlfred()) {
    logger.log('alfred is not installed')
    // exit with success
    process.exit(0)
  }
  logger.log('alfred is installed')
  // exit with fail
  process.exit(1)
})

program.parse(process.argv)
