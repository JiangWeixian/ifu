import fs from 'fs';

const isInstallAlfred = () => {
  return fs.existsSync("/Applications/Alfred 4.app/");
};

export { isInstallAlfred };
