import config from "../../../utils/config";
import * as PayServices from '../services/tpl';
import {Modal} from 'antd-mobile'
import qrcode from '../images/qrcode.jpg'

export default {
    namespace: 'pay',
    state: {
        type:'alipay',
        headerText:'银联支付',
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/pay' && localStorage.getItem(config.KEY)){
                    dispatch({
                        type:'assignType',
                        way:query.type
                    })
                }
            })
        },
    },

    effects: {
        *submit({params},{call,put}){
            const {data} = yield call(PayServices.pay,params);
            if(data){
                if(data.状态){
                    // window.location.href = data.信息;
                    Modal.alert('扫码支付', <img src={"http://106.15.59.190:1022/code.png?time="+new Date().valueOf()} style={{width:'100%'}}/> , [
                        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                    ])
                }
            }
        }
    },

    reducers: {
        assignType(state,{way}){
            let text = '';
            if(way === 'alipay'){
                text = '银联支付'
            }
            if(way === 'payunion'){
                text = '银行转账'
            }
            return{
                ...state,
                type:way,
                headerText:text
            }
        }
    },

};
