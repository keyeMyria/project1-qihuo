import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import 'lodash'
// import Iframe from './iframe'
class Kmap extends React.Component{
    constructor(){
        super()
    }
    state = {
        k_nav:['分时','1分钟','5分钟','15分钟'],
        choose:'分时',
        index:0
    }
    componentDidMount(){
        // const test = document.frames['myId'].test;
        // console.log(test);
        // this.draw()
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(this.state.choose != prevState.choose){
    //         // console.log(1);
    //         // this.draw()
    //     }
    // }
    // draw(){
    //     window.a.宽 = document.body.clientWidth;
    //     window.a.高 = 200;
    //     window.a.画布id = "canvas1";
    //     window.a.上边距 = 40;
    //     window.a.类型 = this.state.choose;
    //     window.a.代码 ="sc1809";
    //     window.a.定时 =300;
    //     window.a.go();
    // }
    choose = (value,index) => () =>{
        this.setState({
            choose:value,
            index:index
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("robin");
        return false;
    }
    render(){
        const url = window.k_url + "?type=" + this.state.index;
        console.log(url);
        return(
            <div>
                <nav styleName="k-nav">
                    {this.state.k_nav.map((item,index) => (
                        <div style={item === this.state.choose ? {borderBottom:'1px solid #fff'} : {}} key={'k_nav_'+index} styleName="k-nav-item" onClick={this.choose(item,index)}>
                            {item}
                        </div>
                    ))}
                </nav>
                {/*<Iframe url={url}/>*/}
                {/*<canvas id="canvas1" style={{zoom:0.5}}></canvas>*/}
            </div>
        )
    }
}

export default CSSModules(Kmap, styles)

