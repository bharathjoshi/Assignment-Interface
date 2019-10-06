import { Card } from 'antd';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from "../store/actions/assignments";
import Questions from './Questions'
import Hoc from '../hoc/hoc'
import Choices from './Choices'
class AssignmentDetail extends Component {
    state= {userAnswers : {}}
    onChange = (e ,qId)=> {
      const { userAnswers } = this.state;

      userAnswers[qId] = e.target.value;
      this.setState({
        userAnswers
      });
    };
    componentDidMount=()=> {
        console.log(this.props.token,'did')
        if (this.props.token !== undefined && this.props.token !== null) {
          this.props.getAss(this.props.token,this.props.match.params.id);
        }
      }
    
      componentWillReceiveProps= (newProps)=> {
       
        console.log(newProps.token,'new')

        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.getAss(newProps.token,this.props.match.params.id);
           
          }
        }
      }
    render() {
      
        return (
          
          <Hoc>
            {Object.keys(this.props.currentAssignment ).length>0 ?
              (
              <Hoc>
                  <Card title={this.props.currentAssignment.title}>
                      <Questions questions = {this.props.currentAssignment.questions.map(q =>{
                        return (
                          <Card
                          type="inner"
                          key={q.id}
                          title={`${q.order}. ${q.question}`}
                         >
                           <Choices choices = {q.choices} change = {this.onChange} questionId ={q.order} userAnswers = {this.state.userAnswers} />
                           </Card>                        )
                      })}
                      />
                    </Card>
              </Hoc>
              )
             : null  }
          </Hoc>

        )
    }
}
const mapStateToProps = state => {
    return {
      token : state.auth.token,
      currentAssignment: state.assignments.currentAssignment,

      error: state.assignments.error,
      assignments : state.assignments.assignments
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getAss : (token ,id )=>{dispatch(actions.getAssDetail(token,id))}
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AssignmentDetail);
  