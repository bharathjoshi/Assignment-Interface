import React, { Component } from 'react'
import { connect } from "react-redux";
import { List} from 'antd';
import Result from './Result'
import {getGradedAss} from '../store/actions/gradedAssignments'

class Profile extends Component {
    componentDidMount=()=> {
        console.log(this.props.token,'profile.js')
        if (this.props.token !== undefined && this.props.token !== null) {
          this.props.getGradedAss(this.props.token,this.props.username   );
        console.log()
        }
      }
    
      componentWillReceiveProps= (newProps)=> {
       

        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.getGradedAss(newProps.token,this.props.username);
           
          }
        }
      }
    render() {
        return (
            <div>
               <h1>{this.props.username}</h1>
                <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={this.props.gradedAssignments}
                renderItem={a=><Result key = {a.id} grade= {a.grade} />}
                />
            
                        </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
    username : state.auth.username,
    token : state.auth.token,
    gradedAssignments : state.gradedAssignments.gradedAssignments
    }
}
const mapDispatchToProps = dispatch => {
    return {
      getGradedAss : (token ,username)=>{dispatch(getGradedAss(token,username))}
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
