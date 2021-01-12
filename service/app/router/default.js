module.exports = app => {
  const { router, controller} = app;
  const blogauth = app.middleware.blogauth
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getData', controller.default.home.getData);
  router.get('/default/getArticleId/:id', controller.default.home.getArticleId);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);
  router.post('/default/updateViewcount', controller.default.home.updateViewcount);
  router.get('/default/test', controller.default.home.test);
  router.post('/default/updateComment', controller.default.home.updateComment);
  router.post('/default/login',controller.default.home.login);
  router.post('/default/addComments',controller.default.home.addComments);
  router.get('/default/hotArticle',controller.default.home.hotArticle)
};
