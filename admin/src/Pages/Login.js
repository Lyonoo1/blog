import React,{useState} from 'react';
import {Button,Card,Input,Spin,message} from 'antd'
import {UserOutlined,KeyOutlined} from '@ant-design/icons'
import servicePath from './../config/apiUrl.js'
import axios from 'axios'
import 'antd/dist/antd.css'
import './static/css/login.css'

function Login(props){
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
        //post 将data发送给服务器，并且服务器还会返回data
        axios({
            method:'post',
            data:dataLogin,
            url:servicePath.checkLogin,
            header: { "Access-Control-Allow-Origin": "*" },
            withCredentials:true//跨域
        }).then((res)=>{
            setIsLoading(false)
            if(res.data.status === 200){
                console.log("open--login.js:"+res.data.openId)
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
               
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
                title="WEB System"
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