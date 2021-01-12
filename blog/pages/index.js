import React, { useState,useEffect } from "react"
import Head from "next/head"
import Link from 'next/link'
import { Button,Row,Col,List ,Carousel,Tabs} from 'antd';
import axios from 'axios'
import {FireOutlined,VideoCameraOutlined,CalendarOutlined} from '@ant-design/icons'
import Header from '../components/Header' 
import Author from '../components/Author'
import Adverts from "../components/Advert"
import servicePath from "../config/apiUrl"
import Footer from "../components/Footer"
import './../static/style/pages/index.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css' 

const { TabPane } = Tabs;

const Home =  () =>{
  const [myList, setMylist] = useState()
  const [hotList, setHotlist] = useState()
  const [bimg,setBimg] = useState('../static/imgs/bilibili.jpg')
  const [img,setImg] = useState(['../static/imgs/one.jpg','../static/imgs/two.jpg','../static/imgs/three.jpg'])
  const [imgRight,setImgRight] = useState(['../static/imgs/sun.jpg'])
  const [total,setTotal] = useState(0)
  
 // const [name,setName]=useState(props.location.query)
  const renderer = new marked.Renderer()

  useEffect(()=>{
    initialProps()
  
  },[])
    marked.setOptions({
      renderer:renderer,
      gfm:true,
      pedantic:false,
      sanitize:false,
      tables:true,
      breaks:false,
      smartLists:true,
      smartypants:false,
      highlight:function (code){
        return hljs.highlightAuto(code).value
      }
    })
    
    const backImage = {
      backgroundImage:`url(${bimg})`
     }

     
     const initialProps = ()=>{
      axios(servicePath.getArticleList)
      .then(res=>{
        //console.log("--------------------axios:"+JSON.stringify(JSON.stringify(res.data)))
        setMylist(res.data.data)
      }),

      axios(servicePath.hotArticle).
      then(res=>{
        setHotlist(res.data.data)
       
      
      })
     }
     
    const hotCount = (id,count)=>{
      axios({
                method:'post',
                url:servicePath.updateViewcount,
                data:{id:id,count:count},
                withCredentials:true
      }).then(
        res=>{
          console.log(res.data.status)
        }
      )
     }
  return (
    <div>
      <Head>
        <title>Home</title>  
      </Head>
      <Header ></Header>
      <Row className="comm-main" type="flex" justify="center">

        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <Row className='lunbo' >
            <Col span={16}>
            <Carousel autoplay>
   
                {
                  img.map((item,index)=>[
                    <div> <img className="img-left" src={item} key={index}/> </div>
                  ])
                }
            
            </Carousel>
            </Col>
            <Col span={8}>
              <Row><div><img className="img-rightOne" src={imgRight}/></div></Row>
              <Row><div ><img className="img-rightTwo" src={imgRight}/></div></Row>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="最新" key="1">
            <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item,index)=>(
              <List.Item>
                      <div className="list-title">
                        <Link  href={{pathname:'/detailed',query:{id:item.id}}}>
                        <a onClick={()=>{hotCount(item.id,item.view_count)}}> {item.title}</a>
                        </Link>
                        </div>
                      <div className="list-icon">
                        <span> <CalendarOutlined />{item.addTime} </span>
            <span> <VideoCameraOutlined />{item.typeName}{setTotal(index)}</span>
                        <span> <FireOutlined />{item.view_count}</span>
                      </div>
                      <div className="list-context" 
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                      ></div>
                </List.Item>  
        )}
        />
            </TabPane>
           
            <TabPane tab="热门" key="2">
            
              <List
              itemLayout='vertical'
            
              dataSource={hotList}
              renderItem={(item,index)=>(
             <List.Item>
               <div className='list-title'>
                 <Link href={{pathname:'/detailed',query:{id:item.id}}}>
              <a onClick={()=>{hotCount(item.id,item.view_count)}}>{item.title}</a>
              
                 </Link>
                 </div>
                 <div className='list-icon'>
                    <span><CalendarOutlined/>{item.addTime}</span>
                    <span><VideoCameraOutlined />{item.typeName}{setTotal(index)}</span>
                    <span> <FireOutlined />{item.view_count}</span>
                    <div className="list-context" 
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                      ></div>
                 </div>
              
             </List.Item>
              )}  />
             
            </TabPane>
        
            <TabPane tab="推荐" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
     
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

// Home.getInitialProps = async ()=>{

//   const promise = new Promise((resolve)=>{
//     axios(servicePath.getArticleList)
//     .then(res=>{
//       //console.log("--------------------axios:"+JSON.stringify(JSON.stringify(res.data)))

//       resolve(res.data)
//     })
//   })
//   return (await promise)
// }
export default Home