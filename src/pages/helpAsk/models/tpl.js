import * as TplServices from '../services/tpl'
import {Toast} from 'antd-mobile'
import router from 'umi/router'

export default {
    namespace: 'helpAsk',
    state: {
        type_list:[
            '账户充值及提款问题',
            '点买点卖问题',
            '结算问题',
            '我要投诉',
            '意见反馈',
            '其他问题',
        ],
        type:0,
        content:''
    },
    subscriptions: {},

    effects: {
        *ask({},{call,put,select}){
            const type = yield select(state => state.helpAsk.type);
            const content = yield select(state => state.helpAsk.content);
            if(type === 0){
                Toast.info('请选择留言类型');
                return;
            }
            if(content === ""){
                Toast.info('请输入留言内容');
                return;
            }
            const {data} = yield call(TplServices.ask,{type:type,content:content})
            if(data){
                if(data.状态){
                    Toast.info(data.信息);
                    router.goBack();
                }
            }
        }
    },

    reducers: {
        assignType(state,{value}){
            return {
                ...state,
                type:value
            }
        },
        assignContent(state,{content}){
            return {
                ...state,
                content:content
            }
        }
    },

};
