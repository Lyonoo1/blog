import React,{useState,useEffect} from 'react'
import marked from 'marked'
import {Row,Col,Input,Select,Button,DatePicker,Space, message} from 'antd'
import {TagOutlined,CloudUploadOutlined} from '@ant-design/icons'
import axios from 'axios'
import servicePath from './../config/apiUrl'
import './static/css/addArticle.css'
import moment from 'moment';

 

const{Option} = Select
const{TextArea} = Input
const dataFormate = 'YYYY-MM-DD'

function AddArticle(props){

    const [ articleId,setArticleId]=useState(0) //文章ID 如果是0说明是新增加，如果不是0,说明是修改 对应数据库的Id
    const [ articleTitle,setArticleTitle] = useState('')  //文章标题
    const [ articleContent,setArticleContent] = useState('')//markdown的编辑内容
    const [markdownContent,setMarkdownContent] =useState('预览html内容') //html内容
    const [introducemd,setIntroducemd] = useState()  //简介的mkdown内容
    const [introduceHtml,setIntroduceHtml] =useState('等待编辑')//简介html内容
    const [showDate,setShowDate]  = useState() //发布日期
    const [updateDate,setUpdateDate] = useState()//修改日志的日期
    const [typeInfo,setTypeInfo] = useState([]) //文章类别
    const [selectedType,setSelectedType] = useState('选择类别')//选择的文章类别
 
    useEffect(()=>{
        getTypeInfo()

        //获取传来的id
        let id = props.match.params.id
       if(id){
           setArticleId(id)
           addContentById(id)
           console.log('title:'+articleTitle)
           
       }
    },[])//两个参数，第一个是函数，第二个是数组为空时只执行一次
    //解析markdown
    
    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false,
    
    })
  
    const onChangeContent = (e)=>{
        setArticleContent(e.target.value)
        //解析文档
        let htmlContent = marked(e.target.value)
        setMarkdownContent(htmlContent)

    }

    const onChangeIntroduce = e=>{
        setIntroducemd(e.target.value)
        let h = marked(e.target.value)
        setIntroduceHtml(h)
    }
    //获取文章类别的按钮
    const getTypeInfo = ()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials:true
        }).then(
            res=>{
                //这里因为有路由守卫 进行判断 当前页面是否登陆了
                if(res.data.data=='没有登录'){//没有登陆
                    console.log("failed")
                    localStorage.removeItem('openId')
                    props.history.push('/')//跳转到登陆页面
                }else{
                    console.log("success")
                    setTypeInfo(res.data.data)
                }
            }
        )

    }
    const selectTypeHandle =(v)=>{
        setSelectedType(v)
    }
    const uploadArticle =()=>{
        if(!articleTitle){
            message.error('文章标题不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('文章简介不能为空')
            return false
        }else if(!showDate){
            message.error('文章日期不能为空')
            return false
        }else if(selectedType =='选择类别'){
            message.error('要选择文章类别')
            return false
        }
        
        let articleData ={
            type_id:selectedType,
            title:articleTitle,
            article_content:articleContent,
            introduce:introducemd,
            addTime:(new Date(showDate.replace('-','/')).getTime())/1000,

        }
        if(articleId==0){
            articleData.view_count = Math.ceil(Math.random()*1000)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:articleData,
                withCredentials:true
            }).then(
                res=>{
                    //console.log("res.data.insertId:"+res.data.insertId)
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success("文章发布成功")
                    }else{
                        message.error('文章发布失败')
                    }
                }
            )
        }else{
            //console.log("articleId:"+articleId)
            articleData.id = articleId
            //console.log('else:'+JSON.stringify(articleData))
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:articleData,
                withCredentials:true
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('文章更新成功')
                    }else{
                        message.error('文章更新失败')
                    }
                }
            )

        }
    }

    //根据传来的ID 获取的信息
    const addContentById =(id)=>{
        axios({
            method:'get',
            url:servicePath.updateArticleListById+id,
            withCredentials:true
        }).then(
            res=>{
                let data = res.data.data
                setArticleTitle(data[0].title)
                setSelectedType(data[0].typeId)
                setShowDate(data[0].addTime)
                setArticleContent(data[0].content)
                let htmlCon = marked(data[0].content)
                setMarkdownContent(htmlCon)
                setIntroducemd(data[0].introduce)
                let htmlMd = marked(data[0].introduce)
                setIntroduceHtml(htmlMd)
            }
        )
      
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={17}>
                <Row gutter={10}>
                    <Col span={20}>
                        <Input 
                        placeholder="博客标题" 
                        value={articleTitle} 
                        onChange={e=>{setArticleTitle(e.target.value)}} 
                        size="large"/>
                    </Col>
                   
                    <Col span={4}>
                       <Select 
                       defaultValue={selectedType}
                       value={selectedType}
                        onChange={selectTypeHandle}
                        size="large">
                           {typeInfo.map((item,index)=>{
                             return ( <Option value={item.Id} key={index}>{item.typeName}</Option>)
                          })}    
                       </Select>
                    </Col>
                </Row> 
                <br/>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextArea 
                        className="markdown-content"  
                        placeholder="文章内容"
                        value={articleContent}
                        onChange={onChangeContent}
                        onPressEnter={onChangeContent}
                         rows={35} 
                         allowClear/>
                    </Col>
                    <Col span={12}>
                    <div 
                    className='show-html'
                    dangerouslySetInnerHTML={{__html:markdownContent}}
                    ></div>
                

                    </Col>
                </Row>
                
                </Col>
                <Col span={7}>
                    <Col span={24}>
                        <Button type="" size="large" icon={<TagOutlined />}>暂存文章</Button>
                        &nbsp;
                        <Button type="primary" size="large" icon={<CloudUploadOutlined />} onClick={uploadArticle}>发布文章</Button>
                    </Col>
                    <br/>
                    <Col span={24}>
                        <TextArea 
                        placeholder="文章简介" 
                        rows={8}
                        value={introducemd}
                        onChange={onChangeIntroduce}
                        onPressEnter={onChangeIntroduce}
                        >
                        
                        </TextArea>
                    </Col>
                    <br/>
                    <Col span={24}>
                    <div 
                    className="introduce-html"
                    dangerouslySetInnerHTML={{__html:introduceHtml}}
                    ></div>
                    </Col>
                    <br/>
                    <Row>
                    <Col span={12}>
                        <div className="date-select" >
                            <DatePicker 
                            size="large" 
                            onChange={(data,dataString)=>{setShowDate(dataString)}} 
                            value={moment(showDate)}
                
                            placeholder="发布日期"/>
                            </div> 
                            </Col>
                            <Col span={12}>
                        <div className="date-select">
                            <DatePicker size="large"  placeholder="修改日期"/>
                            </div> 
                            </Col>
                    </Row>
                    
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle