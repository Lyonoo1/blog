'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async lyon() {
    const { ctx } = this;
    ctx.body = '<div>Lyonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</div>';
  }
}

module.exports = HomeController;
// get 获取 post 新建 put 更新资源  delete 删除资源
