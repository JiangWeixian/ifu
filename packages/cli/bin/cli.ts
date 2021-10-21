#!/usr/bin/env node
import { program } from 'commander'
import { isInstallAlfred } from './index'
import logger from './utils/logger'

const cli = program.version(require('../package.json').version).name('bin-template')

cli.option('-c, --check', 'check is alfred installed').action(() => {
  if (!isInstallAlfred()) {
    logger.log('alfred is not installed')
    process.exit(1)
  }
  logger.log('alfred is installed')
})

program.parse(process.argv)
