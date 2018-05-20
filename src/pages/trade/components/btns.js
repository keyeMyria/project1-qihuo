import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import {Modal} from 'antd-mobile'
import config from '../../../utils/config'
import React from 'react'

let id;

class Btns extends React.Component{
    componentWillReceiveProps(){
        const {getPingNum,no_trade} = this.props;
        if(no_trade){
            clearInterval(id);
        }
    }
    componentDidMount(){
        const {getPingNum} = this.props;
        id = setInterval(getPingNum,1000)
    }
    render(){
        const {...rest} = this.props;
        return(
            <div>
                <div styleName="trade-btn-wrap">
                    <div styleName="trade-btn" onClick={rest.ifSwitch('确定买入？',rest.buy)}>
                        <div styleName="btn-num">{rest.data.买价 ? rest.data.买价 : '...'}</div>
                        <div styleName="btn-title">买</div>
                    </div>
                    <div styleName="trade-btn" onClick={rest.ifSwitch('确定平买？',rest.ping_buy)}>
                        <div styleName="btn-num">持{rest.buy_num}手</div>
                        <div styleName="btn-title">平买</div>
                    </div>
                    <div styleName="trade-btn" onClick={rest.ifSwitch('确定卖出？',rest.sell)}>
                        <div styleName="btn-num">{rest.data.卖价 ? rest.data.卖价 : '...'}</div>
                        <div styleName="btn-title">卖</div>
                    </div>
                    <div styleName="trade-btn" onClick={rest.ifSwitch('确定平卖？',rest.ping_sell)}>
                        <div styleName="btn-num">持{rest.sell_num}手</div>
                        <div styleName="btn-title">平卖</div>
                    </div>
                </div>
            </div>
        )
    }
}
// const Btns = ({...rest}) => {
//     return (
//         <div>
//             <div styleName="trade-btn-wrap">
//                 <div styleName="trade-btn" onClick={rest.ifSwitch('确定买入？',rest.buy)}>
//                     <div styleName="btn-num">{rest.data.买价 ? rest.data.买价 : '...'}</div>
//                     <div styleName="btn-title">买</div>
//                 </div>
//                 <div styleName="trade-btn" onClick={rest.ifSwitch('确定平买？',rest.ping_buy)}>
//                     <div styleName="btn-num">持{rest.buy_num}手</div>
//                     <div styleName="btn-title">平买</div>
//                 </div>
//                 <div styleName="trade-btn" onClick={rest.ifSwitch('确定卖出？',rest.sell)}>
//                     <div styleName="btn-num">{rest.data.卖价 ? rest.data.卖价 : '...'}</div>
//                     <div styleName="btn-title">卖</div>
//                 </div>
//                 <div styleName="trade-btn" onClick={rest.ifSwitch('确定平卖？',rest.ping_sell)}>
//                     <div styleName="btn-num">持{rest.sell_num}手</div>
//                     <div styleName="btn-title">平卖</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const mapStateToProps = state => ({
    buy_num: state.trade.buy_num,
    sell_num: state.trade.sell_num,
    no_trade:state.trade.no_trade
})

const mapDispatchToProps = (dispatch, props) => ({
    getPingNum: () => {
        dispatch({
            type: 'trade/getPingNum'
        })
    },
    ifSwitch:(title,callback) => () => {
        if(sessionStorage.getItem(config.TRADE_SWITCH) === null || sessionStorage.getItem(config.TRADE_SWITCH) === "true"){
            Modal.alert(title, '', [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        callback && callback();
                    }
                }
            ])
        }else{
            callback && callback();
        }
    },
    buy: () => {
        dispatch({
            type: 'trade/order',
            direction: 0,
            offset: 0
        })
    },
    sell: () => {
        dispatch({
            type: 'trade/order',
            direction: 1,
            offset: 0
        })
    },
    ping_buy: () => {
        dispatch({
            type: 'trade/ping',
            direction: 0
        })
    },
    ping_sell: () => {
        dispatch({
            type: 'trade/ping',
            direction: 1
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Btns, styles))

