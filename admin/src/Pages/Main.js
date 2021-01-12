import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Login from  './Login'
import AdminIndex from './AdminIndex'

function Main(){

    return (
        <Router>
            {/* <Link   to='/login/'>登陆页面</Link><br/>
            <Link   to='/index/'>管理页面</Link> */}

            <Route  path="/" exact component={Login}/>
            <Route  path="/index/"  component={AdminIndex}/>
            
        </Router>
    )
}
export default Main