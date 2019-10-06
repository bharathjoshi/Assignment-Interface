import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import Profile from './containers/Profile'
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import AssignmentList from './containers/AssignmentList'
import AssignmentDetail from './containers/AssignmentDetail'
import AssignmentCreate from './containers/AssignmentCreate'
const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/assignments" component = {AssignmentList}/>
    <Route exact path = "/assignments/:id" component = {AssignmentDetail}/>
    <Route exact path = "/create" component ={AssignmentCreate}/>
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/profile/:id" component={Profile} />

  </Hoc>
);

export default BaseRouter;
