import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';

import Index from './compontents/index.js';
import 'styles/base.scss';






/*
*
* ps:单一数据流从父组件到子组件
*
*
* */


render(<Index/>,document.getElementById("container"));

//class App extends React.Component {
//    render(){
//        return (
//            <div>
//                <h1>APP=^_^</h1>
//                <p>Hello World !</p>
//            </div>
//        )
//    }
//}
//
//
//class Index extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>APP=^_^</h1>
//                <p>This is index page !</p>
//            </div>
//        );
//    }
//}
//
//class Login extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>APP=^_^</h1>
//                <p>This is login page !</p>
//            </div>
//        );
//    }
//}
//
//class Regist extends React.Component {
//    render() {
//        return (
//            <div>
//                <h1>APP=^_^</h1>
//                <p>This is regist page !</p>
//            </div>
//        );
//    }
//}
//
//
//render((
//    <Router history={hashHistory}>
//        <Route path="/" component={App}/>
//        <Route path="/index" component={Index}/>
//        <Route path="/login" component={Login}/>
//        <Route path="/regist" component={Regist}/>
//    </Router>
//    ), document.getElementById("container"));