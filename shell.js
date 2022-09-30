var shell = require('shelljs');
if (shell.exec('npm run wbuild').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}


shell.echo('App file creating...');
shell.cd('../../../RPA/src');

if (shell.exec('node FilePackager.js ../../Applications/BPMGenesis/Playground/dist/index.js ../../DemoApp/apps/Playground.app').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}
shell.echo('App file done.');

shell.cp('-Rf', '../../DemoApp/apps/Playground.app', '../../pythonProjects/bpmgenesis/src/portal/static/applications/Playground.app');
shell.echo('App file done.');

shell.echo('App store info updating...');
const path = require('path');
const fs = require('fs');
const a = fs.readFileSync('../../pythonProjects/bpmgenesis/src/portal/static/appstore.json', 'utf8');

const appStoreInfo = JSON.parse(a);
const result = appStoreInfo.apps.find(item => item.id === 'Playground');
//console.log('results ' + JSON.stringify(result));
if (result) {
    const index = appStoreInfo.apps.indexOf(result);
    appStoreInfo.apps[index] = require('./src/AppStoreInfo');
} else {
    appStoreInfo.apps.push(require('./src/AppStoreInfo'));
}
const aa = JSON.stringify(appStoreInfo);

fs.writeFileSync('../../pythonProjects/bpmgenesis/src/portal/static/appstore.json', aa, 'utf8');
shell.echo('App info done.');