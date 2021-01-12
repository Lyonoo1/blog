import React ,{useState,setState,useEffect} from 'react';
import axios from 'axios'
import servicePath from "../config/apiUrl"
import { Icon,Comment, Avatar, Form, Button, List, Input,Tooltip } from 'antd'
import {LikeOutlined, DislikeFilled, LikeFilled,DislikeOutlined} from '@ant-design/icons'
import moment from 'moment';
const { TextArea } = Input;


const CommentPart = (param)=>{
let propsData = param.propsData
const [uid,setUid] =useState(propsData[0].uid)//当前文章的id 
const [len,setLen] =useState(propsData[0].len)//当前查询到总共有多少条数据用于查找评论 
const [comments,setComments] = useState([]) //评论内容
const [token,setToken] = useState()
const [name,setName] = useState()

// console.log(props)
 useEffect(()=>{
   getComments(propsData)
   getToken()
 },[])

 //获取评论 回复
 const getToken= ()=>{
  
  console.log(localStorage.getItem('token'))
  let namePin =  localStorage.getItem('token').split('===')
  setName(namePin[1])
  setToken(namePin[0])
}
 const getComments = (propsData) =>{
   let com = []
   com.props = propsData[0]
     for(let i = 0 ; i<=len-1;i++){
      
        let cid = propsData[i].comId
       
         com[i]={
           author: <p>{propsData[i].com_userName}</p>,
           avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
           content: <p>{propsData[i].com_content}</p>,
           datetime: moment().fromNow(),
           com_like:propsData[i].com_like  ,
           com_dislike: propsData[i].com_dislike  ,
           comid: propsData[i].comId  ,
           iconlike: propsData[i].com_iconLike  ,
           icondislike: propsData[i].com_iconDislike ,
            
        
           }
       }
       console.log('comment:',com)
       
       setComments(com)
    }
    


const getComment = ()=>{
   let id = uid

   axios(servicePath.getArticleId+id).then(
     res =>{
         let comData = res.data.data
         console.log('comData:==============')
         console.log(comData)
         let com = []
         com.props = comData[0]
           for(let i = 0 ; i<=len-1;i++){
              if(comData[i].id == uid){
               com[i]={
                 author: <p>{comData[i].com_userName}</p>,
                 avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                 content: <p>{comData[i].com_content}</p>,
                 datetime: moment().fromNow(),
                 com_like: comData[i].com_like  ,                 
                 com_dislike:comData[i].com_dislike,
                 comid:comData[i].comId,
                 iconlike: comData[i].com_iconLike  ,
                 icondislike: comData[i].com_iconDislike ,
                 }
               }
             }
             setComments(com)
     }
   )
 
}
//评论区 
const  [submitting,setSubmitting] = useState(false)
const  [value,setValue] = useState('')

let likeData = {}

const handleSubmit = () => {
    if (!value) {
      return;
    }
    let data = {
      create_user : name,
      com_content : value,
      com_addTime : (Date.parse(new Date()))/1000,
      com_id : uid
    }
    axios(
      {
        url:servicePath.addComments,
        method:'post',
        data:data,
        withCredentials:true,
        headers:{'Authorization': ` ${token}`}
      } 
    ).then(
      res=>{
        let id = res.data.insertId;
        let status = res.data.status;
        console.log('插入id：'+id)
        console.log('状态：'+status)
      }
    )
   
    setSubmitting(true)
  
    
    setTimeout(() => {
      setSubmitting(false)
      setValue("")
      getComment()
    }, 1000);
    
  };
  
  const handleChange = e => {
    setValue(e.target.value)
    

  };
  //储存点赞 
 const postComment = ()=>{
   
       axios(
         {
           method:'post',
           data:likeData,
           withCredentials:true,
           headers:{'Authorization': ` ${token}`},
           url:servicePath.updateComment
         }).then(
           res=>{
            //  console.log('postcomments'+res.data.status)
              console.log(res.config.data)
           }
         
       )
 }
 


  const clickedLike=(val,iconDis,comid,dislike,iconLike)=>{
    if(iconDis == 'disliked'){
      likeData ={
        com_like:val +1,
        com_dislike:dislike-1,
        id:uid,//文章id
        comId:comid   , //评论id
        com_iconLike:'liked',
        com_iconDis:'dislike'
    
      }
    }else if(iconLike == 'liked'){
      likeData ={
        com_like:val-1,
        com_dislike:dislike   ,
        id:uid,//文章id
        comId:comid   , //评论id
        com_iconLike:'like',
        com_iconDis:'dislike'
    
      }
    }else{
      likeData ={
        com_like:val+1,
        com_dislike:dislike   ,
        id:uid,//文章id
        comId:comid   , //评论id
        com_iconLike:'liked',
        com_iconDis:'dislike'
    
      }
    }
    postComment()
    getComment()
   
}

  const clickedDislike =(dislike,iconLike,comid,like,iconDislike)=>{   
 
    if(iconDislike == 'disliked'){
          likeData ={
            com_like:like,
            com_dislike:dislike-1,
            id:uid,//文章id
            comId:comid   , //评论id
            com_iconLike:'like',
            com_iconDis:'dislike'
        
          }
        }else if(iconLike == 'liked'){
          likeData ={
            com_like:like-1,
            com_dislike:dislike+1,
            id:uid,//文章id
            comId:comid   , //评论id
            com_iconLike:'like',
            com_iconDis:'disliked'
        
          }
        }else{
          likeData ={
            com_like:like,
            com_dislike:dislike +1 ,
            id:uid,//文章id
            comId:comid   , //评论id
            com_iconLike:'like',
            com_iconDis:'disliked'
        
          }
        }
        postComment()
        getComment()
       
  }
    return (
        <>     
        {comments.length > 0 &&  
            <List
               dataSource={comments}
               header={`${comments.length}  评论`}
               itemLayout="horizontal"
               renderItem={(item,index) =>
               <Comment  
                 actions={[
                   <Tooltip key="comment-basic-like" >
                                 <span onClick={()=>clickedLike(item.com_like,item.icondislike,item.comid,item.com_dislike,item.iconlike)}>
                                   <span className="comment-action" > 
                                         { item.iconlike==='liked' ? <LikeFilled/>:<LikeOutlined/>}{item.com_like?item.com_like:0}</span>
                                 </span>
                               </Tooltip>,
                               <Tooltip key="comment-basic-dislike">
                                 <span  onClick={()=>clickedDislike(item.com_dislike,item.iconlike,item.comid,item.com_like,item.icondislike)}>
                                   {React.createElement(item.icondislike ==='disliked'  ? DislikeFilled : DislikeOutlined)}
                                     <span className="comment-action"  >{item.com_dislike?item.com_dislike:0}</span>
                                 </span>
                               </Tooltip>,
                               <span key="comment-basic-reply-to">回复</span>,
                               
                 ] }
                

                 {...item}
                 datetime={
                   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                     <span>{moment([2020, 7, 16]).fromNow()}</span>
                   </Tooltip>
                 }
               ><Comment
            //     actions={[<span key="comment-nested-reply-to">Reply to{item.a.b}</span>]}
            //    content={item.c.contentr}
               >
             
               </Comment></Comment>
                 } 
             />}


       <Comment
         avatar={
           <Avatar
             src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
             alt="Han Solo"
           />
         }
         content={
           <>
   <Form.Item>
     <TextArea rows={4} onChange={handleChange} value={value} />
   </Form.Item>
   <Form.Item>
     <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
       Add Comment
     </Button>
   </Form.Item> 
 </>
         }
       />
       </>
    )
}


export default CommentPart