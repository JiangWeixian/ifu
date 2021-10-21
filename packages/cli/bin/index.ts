import fs from 'fs'

export const isInstallAlfred = () => {
  return fs.existsSync('/Applications/Alfred 4.app/')
}
