import React,{useState,useEffect} from 'react'
import {message,Row,List,Col,Modal,Button,Switch} from 'antd'
import axios from 'axios'
import servicePath from './../config/apiUrl'

const {confirm} = Modal
function ArticleList(props){
    const [list, setList] = useState([])

    useEffect(()=>{
        getList()
    },[])

    const getList = ()=>{
        axios({
            method:'get',
            url:servicePath.getList,
            withCredentials:true
        }).then(
            res=>{
                console.log(res.data)
                setList(res.data.data)
            }
        )
    }
    const delArticle=(id,artTitle)=>{
        console.log(id)
        confirm({
            title:`确定删除名为 《${artTitle}》 的博客吗？`,
            content:'注意:点击OK即可删除并不可恢复！',
            onOk(){
                axios({
                    method:'get',
                    withCredentials:true,
                    url:servicePath.delArticle+id                    
                }).then(
                    res=>{
                        console.log(res.data.data)
                        message.success('文章删除成功！')
                        getList()
                    }
                )
            },
            onCancel(){
                message.success('您取消了删除(^ ^)')
            }

        })
    }
    return (
        <div>
            <List
            bordered
            dataSource={list}
            header={
                <Row className="list-div">
                    <Col span={8}><b>标题</b></Col>
                    <Col span={3}><b>类别</b></Col>
                    <Col span={3}><b>浏览量</b></Col>
                    <Col span={3}><b>发布时间</b></Col>
                    <Col span={3}><b>篇数</b></Col>
                    <Col span={4}><b>操作</b></Col>
                </Row>
            }
            renderItem={(item)=>{
                return(
                    <List.Item className="list-div">
                    <Col span={8}>{item.title}</Col>
                    <Col span={3}>{item.typeName}</Col>
                    <Col span={3}>{item.view_count}</Col>
                    <Col span={3}>{item.addTime}</Col>
                    <Col span={3}>共{item.part_count}篇</Col>
                    <Col span={4}>
                        <Button type="primary" onClick={()=>{props.history.push('/index/add/'+item.id)}}>修改</Button>&nbsp;
                        <Button onClick={()=>{delArticle(item.id,item.title)}}> 删除</Button>
                    </Col>
                    </List.Item>
                )
            }}
            />
        </div>
    )
}

export default ArticleList