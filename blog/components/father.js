import React, { Component } from 'react';

import Son from './son'
class Father extends Component {

    constructor(props){
        super(props)
        this.state = {
            childData:{name:'孩子'}
        }
    }
    render(){
        return(
            
                <div style={{textAlign:'center'}}>
                    <Son data={this.state.childData}>{data.name}</Son>
                </div>
            
        )
    }
}