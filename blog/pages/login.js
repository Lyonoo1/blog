import React,{useState} from 'react';
import {Button,Card,Input,Spin,message} from 'antd'
import {UserOutlined,KeyOutlined} from '@ant-design/icons'
import servicePath from './../config/apiUrl.js'
import Router from 'next/router';
import axios from 'axios'
import 'antd/dist/antd.css'
import '../static/style/pages/login.css'

function Login(){
    const [userName,setUsername] = useState('')
    const [userPassword,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    //点击登陆 会loading 一秒钟
   const changeBtn= ()=>{
       
    setIsLoading(true)
        if(!userName){
            setTimeout(function(){
                setIsLoading(false)
            },500)
            message.error('用户名不能为空哦 (^ ^)')
            return false
        }else if(!userPassword){
            message.error('密码不能为空哦 (^ ^)')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataLogin ={
            'userName':userName,
            'password':userPassword
        }
//let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTIzIiwiaWF0IjoxNTgzODM5NDk5fQ.aqKI-IN9Os0v197FMKLoJzihg7UrjgMS1s-cWWt7KSM';
        //post 将data发送给服务器，并且服务器还会返回data
        axios({
            method:'post',
            data:dataLogin,
            url:servicePath.login,
            withCredentials:true//跨域
        }).then((res)=>{
            setIsLoading(false)
            if(res.data.code === 200){
                 console.log("open--login.js:"+res.data.token)
                 localStorage.setItem('token', res.data.token )
                 localStorage.setItem('name',userName)
                Router.push('/index')
               
            }else {
                if(userPassword){
                    message.error('用户名密码错误')
                
                }
               
            }
        })
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    let onKeyCode = (e)=>{
        if(e.keyCode === 13){
           changeBtn()

        }
    }
        return(
        <div className="login-div">
             <Spin tip="Loding...."  spinning = {isLoading}>
                <Card
                title="Blog Login"
                bordered={true}
                style={{width:400}}
                onKeyDown={(e)=>onKeyCode(e)}
                >
                    <Input
                    id="userName"
                    size="large"
                    placeholder="Enter your name"
                    prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    />
                     <br/><br/>
                    <Input.Password
                    id="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />

                    <br/><br/>
                    <Button type="primary" size="large" block  onClick={changeBtn}>Login in</Button>
                </Card>
                
            </Spin> 
        </div>
    )
    
}
export default Login