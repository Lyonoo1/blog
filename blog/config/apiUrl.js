let ipUrl = "http://127.0.0.1:7001/default/"
let servicePath = {
    getArticleId:ipUrl+'getArticleId/',//首页接口
    getArticleList:ipUrl +'getArticleList/',//详细页接口
    getTypeInfo:ipUrl + 'getTypeInfo/',//文章类别接口
    getListById:ipUrl + 'getListById/',//根据文章id获取文章接口
    updateViewcount:ipUrl + 'updateViewcount/',//点击 增加热度
    test:ipUrl + 'test',//点击 增加热度
    updateComment:ipUrl + 'updateComment/',//评论更新
    login:ipUrl+'login/',//登录
    addComments:ipUrl+'addComments/',//添加新评论
    hotArticle:ipUrl+'hotArticle/'//按照热度排名
}

export default servicePath