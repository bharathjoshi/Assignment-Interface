import React, { Component } from 'react';
import { List ,Skeleton } from 'antd';
import { connect } from 'react-redux';
import * as actions from "../store/actions/assignments";
import {Link} from 'react-router-dom'
import Hoc from '../hoc/hoc'

class AssignmentList extends Component {
  componentDidMount=()=> {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getAss(this.props.token);
    }
  }

  componentWillReceiveProps= (newProps)=> {
   

    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getAss(newProps.token);
      }
    }
  }
  renderItem=(item) =>{
    
    return (

      <Link to={`/assignments/${item.id}/`}>
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

    render(){
      return(
          <Hoc>
            {this.props.loading ? (<Skeleton active/>): (<div>
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={this.props.assignments}
                renderItem={item => this.renderItem(item)}
              />
             </div>
             )}

         
          </Hoc>

 
        )
    }
}
const mapStateToProps = state => {
  return {
    token : state.auth.token,
    loading: state.assignments.loading,
    error: state.assignments.error,
    assignments : state.assignments.assignments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAss : token =>{dispatch(actions.getAssList(token))}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);