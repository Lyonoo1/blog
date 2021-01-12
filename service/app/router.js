'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/',controller.home.index)
  // router.get('/lyon',controller.home.lyon)
  require('./router/default')(app);// 调用这个方法并返回
  require('./router/admin')(app);


};
