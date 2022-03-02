require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    console.log('Not building for macOS - Exiting.');
    return;
  }
  
  const appName = context.packager.appInfo.productFilename;
  
  console.log('Building for macOS - Notarizing the app.');
  console.log('Note: This may take a while, possibly hours.');
  console.log('It depends on your network and Apple.');

  try {
    await notarize({
      // appBundleId: process.env.APPID,
      appBundleId: context.packager.appInfo.macBundleIdentifier,
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASS,  
    });

    console.log('Notarization was successful.');
  } catch (error) {
    console.error('Error notarizing: ', error);
  }
};