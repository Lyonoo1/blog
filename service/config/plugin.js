'use strict';

/** @type Egg.EggPlugin */
// 配置数据库
exports.mysql = {
  enble: true,
  package: 'egg-mysql',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.jwt = {
  enable:true,
  package: 'egg-jwt',
}
