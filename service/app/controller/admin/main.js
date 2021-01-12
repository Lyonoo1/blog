'use strict'

const { mysql } = require('../../../config/plugin')
const Controller = require('egg').Controller

class Main extends Controller{

    async index(){
        this.ctx.body=`hi ， I am admin api`
    }
    //检测登陆
    async getUserMSg (){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        let sql = "SELECT userName FROM admin_user WhERE userName= ? AND password = ?"
        //this.app.mysql.query()带参数 防止sql注入
        const res = await this.app.mysql.query(sql,[userName,password])
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime();
            this.ctx.session.openId = { 'openId': openId };
            this.ctx.body = { 'data': "登录成功",'status':200, 'openId': openId };
          } else {
            this.ctx.body = { data: "登录失败" };
          }
        }

    //再后台首页 获取文章的类别（按钮）
    async getTypeInfo(){
        const res=  await this.app.mysql.select('type') 
        console.log("typeInfo:"+this.ctx.session.openId)
        this.ctx.body = {data:res}
    }
    //添加文章
    async addArticle(){
        let articleContent = this.ctx.request.body
        let insertRes = await this.app.mysql.insert('article',articleContent)
        let isOk = insertRes.affectedRows ===1 //1是更新 0 是新增
        let insertId = insertRes.insertId
        this.ctx.body = {
            isSuccess : isOk,
            insertId : insertId
        }
    }

    //修改文章 addArticle
    async updateArticle(){
        //获取前台post传来的指
        //{"type_id":22,"title":"111","article_content":"111\n123","introduce":"111","addTime":1596470400}
        let postData = this.ctx.request.body
        const updateRes =await this.app.mysql.update('article',postData)
        const isOk = updateRes.affectedRows === 1
        this.ctx.body={
            isSuccess:isOk
        }
    }

    async getList(){
        let sql ='SELECT article.id as id, ' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'FROM_UNIXTIME(article.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
        'article.view_count as view_count,' +
        'article.article_content as content,' +
        'type.typeName  as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'ORDER BY article.id DESC ';
        let res = await this.app.mysql.query(sql)

        console.log(res)
        this.ctx.body = {
            data:res
        }
    }
    //this.ctx.params.id  获取url上的参数get
    //this.ctx.request.body 获取页面post传来的 
    //删除所选博客
    async delArticle(){
        let id = this.ctx.params.id
        const res =await this.app.mysql.delete('article',{'id':id})
        console.log('res',res)
        this.ctx.body={data:res}

    }


    //文章列表 修改
    async updateArticleListById(){
        let id = this.ctx.params.id
        let sql ='SELECT article.id as id, ' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'FROM_UNIXTIME(article.addTime,"%Y-%m-%d") as addTime,' +
        'article.view_count as view_count,' +
        'article.article_content as content,' +
        'type.typeName  as typeName, ' +
        'type.id as typeId ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        ' WHERE article.id = ' + id;

        const res =await this.app.mysql.query(sql)
        this.ctx.body={data:res}

    }
    
}

module.exports = Main