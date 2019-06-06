const packageJson = require('../../package.json');

export const environment = {
  appName: 'پیشه',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  serverApiUrl : '/api/',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    material: packageJson.dependencies['@angular/material'],
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
