module.exports = app => {
  const { router, controller } = app;
  const { main } = controller.admin;
  var adminauth = app.middleware.adminauth()//中间件设置
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/getUserMSg',controller.admin.main.getUserMSg);
  router.get('/admin/getTypeInfo',adminauth,main.getTypeInfo);
  router.post('/admin/addArticle',adminauth,main.addArticle);
  router.post('/admin/updateArticle',adminauth,main.updateArticle);
  router.get('/admin/getList',adminauth,main.getList);
  router.get('/admin/delArticle/:id',adminauth,main.delArticle);
  router.get('/admin/updateArticleListById/:id',adminauth,main.updateArticleListById);

};

// module.exports = app =>{
//   const {router, controller} =app;
//   const {mian} = controller.admin;
//   var adminauthtwo = app.middleware.adminauth()
//   router.get( '/admin/index',controller.admin.main.index);
//   router.post('/admin/getUserMsg',constroller.admin.main.getUserMSg);
//   router.post('/admin/addArticle',adminauthtwo,mian.addArticle);
//   router.get('/admin/getTypeInfo',adminauthtwo,getTypeInfo);
//   router.post('/admin/updateArticle',adminauthtwo,main.updateArticle);
//   router.get('/admin/getList',adminauthtwo,main.getList);
//   router.get('/admin/delArticle/:id',adminauthtwo,main.delArticle);
//   router.get('/admin/updateArticleById',adminauthtwo,main.updatearticleById)
// }