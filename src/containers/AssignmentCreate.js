import React from 'react'
import { Form, Input, Icon, Button ,Divider} from 'antd';
import QuestionForm from './QuestionForm';
import Hoc from '../hoc/hoc'
import {connect} from 'react-redux'
import * as actions from "../store/actions/assignments";

class AssignmentCreate extends React.Component {
  
  state= {
      formCount : 1
  }

  remove = k => {
    const { formCount } = this.state;
    this.setState({
        formCount : formCount - 1
    })
  };

  add = () => {
    const { formCount } = this.state;
    this.setState({
        formCount : formCount + 1
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const questions = [];
        for (let i = 0; i < values.questions.length; i += 1) {
          questions.push({
            title: values.question[i],
            choices: values.questions[i].choices.filter(el => el !== null),
            answer: values.answers[i]
          });
        }
        const asnt = {
            teacher: this.props.username,
            title: values.title,
            questions
          };
          this.props.createASS(this.props.token, asnt);

      }
    });
  };

  render() {
    const { getFieldDecorator} = this.props.form;

    const questions= []
    for (let i=0 ;i<this.state.formCount ; i+=1){
        
        questions.push(
        <Hoc key = {i}>
            {questions.length > 0? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled= {questions.length === 0}
              onClick={() => this.remove()}
            />
          ) : null}
            <QuestionForm id ={i} key = {i} {...this.props}/>
            
            <Divider/>
        </Hoc>
        )
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label = "Title">
        { getFieldDecorator(`title`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: "Please input title.",
            },
          ],
        })(<Input placeholder="Title" style={{ width: '60%', marginRight: 8 }} />)
        }
        {questions}
        </Form.Item>
        <Form.Item>
          <Button type="secondary" onClick={this.add}>
            <Icon type="plus" /> Add question
          </Button>
        </Form.Item>
        <Form.Item   >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAssignmentCreate = Form.create({ name: 'dynamic_form_item' })(AssignmentCreate);
const mapStateToProps = state => {
    return {
      token : state.auth.token,
      currentAssignment: state.assignments.currentAssignment,
      username : state.auth.username,
      error: state.assignments.error,
      assignments : state.assignments.assignments
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        createASS : (token,ass)=>{dispatch(actions.createAss(token,ass))}
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedAssignmentCreate);
  