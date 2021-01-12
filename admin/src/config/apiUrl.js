let ipUrl = 'http://127.0.0.1:7001/admin/'
let servicePath={
    checkLogin:ipUrl+'getUserMSg/', //检测登陆接口
    getTypeInfo:ipUrl+'getTypeInfo/', //获取文章的类别 到后台首页
    addArticle:ipUrl+'addArticle/', //添加文章到数据库
    updateArticle:ipUrl+'updateArticle/', //更新文章
    getList:ipUrl+'getList/', //获取文章列表
    delArticle:ipUrl+'delArticle/', //删除文章
    updateArticleListById:ipUrl+'updateArticleListById/' //根据ID获取文章详情（修改文章）
}
export default servicePath