'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const result = await this.app.mysql.get("blog_content",{});//表名，条件
    // console.log("result:"+JSON.stringify(JSON.parse(result)))
    this.ctx.body = 'Apiiiiiiiiiiiiiiiiiiiiiiii';
  }

  async login(){
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    console.log(userName,password)
    let sql = 'SELECT userName from user WHERE userName = ? AND password = ?'
    const token = this.ctx.app.jwt.sign({
      ...this.ctx.request.body
    },this.app.config.jwt.secret,{
      expiresIn:'1h'
    })
    const res = await this.app.mysql.query(sql,[userName,password])
    if(res.length>0){
      this.ctx.body={
        code:200,
        message:'success',
        token
    }
  }else{
    this.ctx.body={
      code:401,
      message:'failed'
    }
    }
    
    
    
      
  }
  async getArticleList() {
    const sql = 'SELECT article.id as id, ' +
           'article.title as title,' +
           'article.introduce as introduce,' +
           'FROM_UNIXTIME(article.addTime,"%Y-%m-%d") as addTime,' +
           'article.view_count as view_count,' +
           'article.article_content as content,' +
           'type.typeName  as typeName ' +
           'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  async getArticleId() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'FROM_UNIXTIME(article.addTime,"%Y-%m-%d") as addTime,' +
    'article.view_count as view_count,' +
    'article.article_content as content,' +
    ' comments.create_user as com_userName, '+
    ' comments.com_content as com_content,'+
    ' comments.com_like as com_like, ' +
    ' comments.com_dislike as com_dislike, '+
    ' comments.com_iconDislike as com_iconDislike, '+
    ' comments.com_iconLike as com_iconLike, '+
    ' comments.id as comId ,' +
    'type.typeName  as typeName ,' +
    'type.id  as typeId  ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    ' LEFT JOIN comments ON article.Id = comments.com_id ' +
    'WHERE article.id =' + id;

    const res = await this.app.mysql.query(sql);
    // console.log(res)
    this.ctx.body = {
      data: res,
      size: res.length
      
    };
  }
  //获取回复评论的详细信息
  async getReply(){
    const id = this.ctx.params.id
    let sql = 'SELECT '+
      'reply.id as replyId ,' +
      'comments.id as comId,'+
       'comments.com_id as com_id,'+
       'comments.com_content as com_content,'+
    ' reply.reply_id as reply_id,' +
    ' reply.reply_user as reply_user ,' +
    ' reply.reply_content as reply_content, '+
    ' reply.reply_like as  reply_like ,' +
    ' reply.reply_dislike as reply_dislike, '+
    ' reply.reply_iconlike as reply_iconLike, ' +
    ' reply.reply_icondislike as reply_iconDislike '+
    ' FROM comments '+
    'LEFT JOIN reply ON comments.id = reply.reply_id '+
    'WHERE comments.com_id = ' + id;

    const res= await this.app.mysql.query(sql)
    this.ctx.body={
      data:res,
      size:res.length
    }
  }
  // 获取类别
  async getTypeInfo() {
    const res = await this.app.mysql.select('type');
    this.ctx.body = { data: res };
  }

  // 根据typeid获取文章
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
  'article.title as title,' +
  'article.introduce as introduce,' +
  'FROM_UNIXTIME(article.addTime,"%Y-%m-%d") as addTime,' +
  'article.view_count as view_count,' +
  'article.article_content as content,' +
  'type.typeName  as typeName ' +
  'FROM article LEFT JOIN type ON article.type_id = type.Id' +
  ' WHERE type_id = ' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  async getData() {
    const sql = 'SELECT * FROM blog_content';
    const res = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: res,
    };
  }
 
  //点击 增加热度
  async updateViewcount(){
    let data = this.ctx.request.body
    let count = data.count 
    let id = data.id
    console.log('count:'+JSON.stringify(data))
    let result =await this.app.mysql.update('article',{
      view_count:count+1
    },{
      where:{
        id:id
      }
    })
    let isOk = result.affectedRows ===1
    this.ctx.body={
      status: isOk
    }
  }

  async test(){
    let res = await this.app.mysql.select('article')
    this.ctx.body={
      data:res
    }
  }

  //更新评论区内容
  async updateComment(){
    let comdata = this.ctx.request.body
    console.log(JSON.stringify(comdata))
    let res = await this.app.mysql.update('comments',{
      com_like:comdata.com_like,
      com_dislike:comdata.com_dislike,
      com_iconLike:comdata.com_iconLike,
      com_iconDislike:comdata.com_iconDis
    },{
      where:{
        id:comdata.comId
      }
    })
    let idSuccess = res.affectedRows===1
    this.ctx.body={
      status:idSuccess
    }

  }

  //储存新评论
  async addComments(){
    const data = this.ctx.request.body
    let result =await this.app.mysql.insert('comments',data)
    console.log(result.insertId)
    console.log(result.affectedRows===1)
    this.ctx.body={
      insertId:result.insertId,
      status:result.affectedRows===1
    }
  }

  //热门 按照浏览量排列
  async hotArticle () {
    const sql = 'SELECT article.id as id, ' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'FROM_UNIXTIME(article.addTime,"%Y-%m-%d") as addTime,' +
    'article.view_count as view_count,' +
    'article.article_content as content,' +
    'type.typeName  as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    ' ORDER BY view_count DESC ';

    let result =await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  
  }

}
module.exports = HomeController;
// get 获取 post 新建 put 更新资源  delete 删除资源
