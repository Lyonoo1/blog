/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596008731066_4395';
  exports.jwt = {
    secret: '123456'
  }
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {

    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'blog',
    },
    app: true,
    agent: false,
  };
  // 解决跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ 'http://localhost:3000','http://localhost:3001']
  };
  config.cors = {
  //  origin: 'http://localhost:3000',
    credentials: true,   // 开启认证
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };
  return {
    ...config,
    ...userConfig,
  };
};
