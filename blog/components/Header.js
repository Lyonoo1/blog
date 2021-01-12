import React , { useState,useEffect}from 'react'
import '../static/style/components/header.css'
import {  HomeFilled,StarFilled,UserOutlined,CodeSandboxCircleFilled ,RadarChartOutlined,DesktopOutlined} from '@ant-design/icons';
import { Row , Col ,Menu ,Button} from "antd" 
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Router from 'next/router';


const Header = (props) => {
    const [navArray,setNavArray] = useState([])
    const [token,setToken] = useState()
    const [name,setName] = useState()
    //页面图标
    const icons = [<StarFilled />,<CodeSandboxCircleFilled />, <RadarChartOutlined />]
   
    const getName= ()=>{
        let namePin =  localStorage.getItem('name')
        setName(namePin)
     }
    useEffect(()=>{
        setToken(localStorage.getItem('token'))
        const  fetchData =async ()=>{
            const res = axios(servicePath.getTypeInfo).then(
              data =>{
                  setNavArray(data.data.data)
                  return data.data.data
              }
            )
        }
        fetchData()
        getName()
    },[])
    const handleClick = (e)=>{
        if(e.key == 0){
            Router.push("/index")
        }else{
            Router.push("/list?id="+e.key)
        }
    }
    const login = ()=>{
        Router.push('/login')
    }
    const loginOut = ()=>{
        setToken('')
    }
    return (//大括号是里面是方法 小括号是可以直接有return
    <div className='header'>
        <Row type='flex' justify='center'>
            <Col  xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">Lyon</span>
                <span className="header-txt">TES VS DWG 3:2</span>
            </Col>
            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="0" onClick={handleClick} icon={<HomeFilled />}>
                        首页
                    </Menu.Item>
               {
                   navArray.map((item)=>{     
                    return(
                    <Menu.Item key={item.Id} icon={icons[item.icon-1]} onClick={handleClick}>
                    {item.typeName}
                    </Menu.Item>
                    )}
                   )
               }
               {
                   token? <Menu.Item icon={<UserOutlined/>} onClick={loginOut}>{name}</Menu.Item> :
                   <Menu.Item>
                   <Button 
                   icon={<DesktopOutlined />}
                   onClick={login}
                   type="primary"
                   size='large'
                   >登录
                   </Button>
               </Menu.Item> 
                
                  
            }
               
                   
                </Menu>
            </Col>
        </Row>
    </div>
)
    }
export default Header