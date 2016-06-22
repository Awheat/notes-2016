import React from 'react';
import {render} from 'react-dom';
import 'styles/app.scss';

import datas from 'data/index.json';



/*
* 1.headerBar 头部栏
*
* */
class HeaderBar extends React.Component {
    handleClick(e) {
        alert("显示选择地区的页面!");
    }
    render() {
        return (
            <div className="header-bar">
                <div className="yyq-area" onClick={this.handleClick}>{this.props.datas.area}</div>
                <div className="yyq-title">{this.props.datas.title}</div>
                <div className="yyq-sign">{this.props.datas.sign}</div>
            </div>
        );
    }
}

/*
* 2.Slider 焦点图
*
* */
class Slider extends React.Component {
    //getInititalState(){
    //    for (var s of this.props.sliders) {
    //
    //    }
    //}
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.props.sliders.map((v) => {
                            //var url = require("../app/images/")+v;
                            return <div className="swiper-slide"><a href="#"><img src={v}/></a></div>
                        })
                    }

                </div>
                <div className="swiper-pagination"></div>
            </div>
        );
    };
}

/*
*
* */
class Index extends React.Component {
    render() {
        return (
            <section className="index-wraper">
                <HeaderBar datas={datas.headerBar}/>
                <Slider sliders={datas.sliders}/>
            </section>
        );
    }
}

export default Index;
