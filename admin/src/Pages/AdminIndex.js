import React,{ useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router ,Link, Route} from 'react-router-dom'
import AddArticle from './addArticle'
import ArticleList from './ArticleList'
import servicePath from './../config/apiUrl'
import './static/css/admin.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){
   const [ collapsed, setCollapsed] = useState(false)

   //左边导航栏 缩放 false是放开 tru缩起来(小) 点击缩放图标 onCollapse回传进一个与现在相反的Boolean值
  const onCollapse = collapsed => {
   setCollapsed(collapsed)
  };

  //
  const handleClickArticle = (e)=>{
    if(e.key=='articleList'){
      props.history.push('/index/list')
    }else if(e.key=='addArticle'){
      props.history.push('/index/add')
    }
  }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" style={{height:32,margin:16,backgroundColor:'rgba(255, 255, 255, 0.2)'}}/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
             工作台
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
             添加文章
            </Menu.Item> */}
            <SubMenu 
            key="sub1" 
            onClick={handleClickArticle}
             icon={<UserOutlined />} 
             title="文章管理">
              <Menu.Item key="articleList">文章列表</Menu.Item>
              <Menu.Item key="addArticle">文章添加</Menu.Item>
             
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="留言管理">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
           
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item> 
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               <div> 
                   <Route path='/index/' exact component={AddArticle}/>
                   <Route path='/index/add/' exact  component={AddArticle}/>
                   <Route path='/index/add/:id' exact component={AddArticle}/>
                   <Route path='/index/list/' exact  component={ArticleList}/>
               </div>
             
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Blog System ©2020 Created by Lyon</Footer>
        </Layout>
      </Layout>
    );
  }


export default AdminIndex
