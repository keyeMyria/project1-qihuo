import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import 'lodash'
// import Iframe from './iframe'
import {Picker} from 'antd-mobile'
class Kmap extends React.Component{
    componentDidMount(){
        const code = sessionStorage.getItem('trade_code');
        const index  = sessionStorage.getItem('trade_index') ? sessionStorage.getItem('trade_index') : 0;
        window.initK(code);
        window.showK(0);
        this.setState({
            index:index
        })
    }
    componentWillUnmount(){
        window.hideK();
    }
    state = {
        k_nav:['分时','1分钟','5分钟','15分钟','30分钟','60分钟'],
        k_list:[{label:'分时',value:'分时'}],
        choose:'分时',
        index:0,
    }

    choose = (value,index) => () =>{
        window.showK(index);
        this.setState({
            choose:value,
            index:index
        })
        sessionStorage.setItem('trade_index',index);
    }
    render(){
        const url = window.k_url + "?type=" + this.state.index;
        const _this = this;
        return(
            <div>
                {/*<nav styleName="k-nav">*/}
                    {/*<Picker data={this.state.k_list} cols={1}>*/}
                        {/*<div styleName="k-nav-item">{this.state.choose}</div>*/}
                    {/*</Picker>*/}
                {/*</nav>*/}
                <nav styleName="k-nav">
                    {this.state.k_nav.map((item,index) => (
                        <div style={index == _this.state.index ? {borderBottom:'1px solid #fff'} : {}} key={'k_nav_'+index}
                             styleName="k-nav-item"
                             onClick={this.choose(item,index)}>
                            {item}
                        </div>
                    ))}
                </nav>
                <div style={{height:window.screen.height -337 + "px"}}>

                </div>
                {/*<Iframe url={url}/>*/}
            </div>
        )
    }
}

export default CSSModules(Kmap, styles)

