import React, { useState,useEffect } from "react"
import Head from "next/head"
import { Button,Row,Col,List,Breadcrumb } from 'antd';
import {FireOutlined,VideoCameraOutlined,CalendarOutlined} from '@ant-design/icons'
import Header from '../components/Header' 
import Author from '../components/Author'
import Adverts from "../components/Advert"
import Footer from "../components/Footer"
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'


const MyList =  (list) =>{
  const [myList, setMylist] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
  })
  return (
    <div>
      <Head>
        <title>Home</title>  
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="bread-div">
                <Breadcrumb>
                <BreadcrumbItem><a href="/">首页</a> </BreadcrumbItem>
                <BreadcrumbItem>视频教程</BreadcrumbItem>
                </Breadcrumb>
            </div>
        <List
       
        itemLayout="vertical"
        dataSource={myList}
        renderItem={(item)=>(
          <List.Item>
                   <div className="list-title">
                     <Link  href={{pathname:'/detailed',query:{id:item.id}}}>
                     <a>{item.title}</a>
                     </Link>
                     </div>
                   <div className="list-icon">
                     <span> <CalendarOutlined />{item.addTime} </span>
                     <span> <VideoCameraOutlined />{item.typeName} </span>
                     <span> <FireOutlined />{item.view_count}人</span>
                   </div>
                   <div className="list-context">{item.introduce}</div>
            </List.Item>  
        )}
        />
        </Col>
        <Col className="comm-right" xs= {0} sm = {0} md = {7} lg ={5} xl = {4}>
          <Author/>
          <Adverts/>
        </Col>
      </Row>
      <Footer/>
  </div>
  )
  
}
//这里 可以将得到的值直接传入MyList里面
MyList.getInitialProps=async(ctx)=>{
  let id = ctx.query.id //获取路由（url）上面的参数
  const promise =  new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      res=>resolve(res.data)
    )
    })
  return (await promise)
}

export default MyList