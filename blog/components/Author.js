import React,{useState} from 'react'
import {Avatar,Divider,Modal, message} from 'antd'
import {GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import './../static/style/components/author.css'
function Author(){

const [penguin, setPenguin] = useState(['1184458527']) 
const [wechat,setWechat]= useState(['./../static/imgs/wechat.jpg'])
const [visible,setVisible]=useState(false)
const [visiblew,setVisiblew]=useState(false)

const githubClick=()=>{
        window.location.href='https://github.com/Lyonoo1/blog'
    }
const qqClick=()=>{
    setVisible(true)
}
const wechatClick=()=>{
    setVisiblew(true)
}

const copyTxt = ()=>{
    const copyEle = document.querySelector('.ant-modal-body')
    const range = document.createRange()
    window.getSelection().removeAllRanges()//清除页面中已有得selection
    range.selectNode(copyEle)
    window.getSelection().addRange(range)
    const copyStatis = document.execCommand('copy')
    if(copyStatis){
        message.success('复制成功')
    }else{
        message.error('复制失败')
    }
    window.getSelection().removeAllRanges()
}

const text = <span>微信联系方式</span>
const content = <image src={wechat} alt='加载失败' width="100%"/>
   return (
       <div className="author-div com-box">
           <div> <Avatar size={100} src="./../static/imgs/author.jpg"/></div>
           <div className="author-name">亚索</div>
           <div className="author-introduction">
               年龄：24 <br/>
              
           </div>
           <Divider>联系方式</Divider>
           <Avatar size={28} icon={<GithubOutlined />} className="account" key="github" onClick={githubClick}/>
           <Avatar size={28} icon={<QqOutlined />} className="account" key="qq" onClick={qqClick}/>
          
           <Modal
           title="QQ联系方式"
           visible={visible}
           onOk={()=>{
               copyTxt()
               setVisible(false)
           }}
           onCancel={()=>setVisible(false)}
           okText="复制"
           cancelText="取消"
            >{penguin}</Modal>

    
            <Avatar size={28} icon={<WechatOutlined />} className="account" key="wechat" onClick={wechatClick}/>
    
            <Modal
           title="微信联系方式"
           visible={visiblew}
           onOk={()=>{
             setVisiblew(false)
             }}
           onCancel={()=>setVisiblew(false)}
           okText="确认"
           cancelText="取消"
            > <div><img src={wechat} width="100%"/></div></Modal>


   
       </div>
   )
   }

export default Author