import React from 'react'
import Base from './base'
import Draw from './draw'
import {connect} from 'dva'

const draw = new Draw();

class K extends React.Component{
    componentDidMount(){
        draw.画布id = "k";
        draw.宽 = window.screen.width;
        draw.高 = window.screen.height -327;
        draw.上边距 = 40;
        draw.定时 =300;
        draw.init();
        draw.loading();
        draw.eve();
        window.chooseKType('sc1809',"分时");
        const _this = this;
        window.work.client.kdata = function (data) {
            _this.assignData(eval("(" + data + ")"));
        };
    }
    draw(data){
        const {type_choose} = this.props;
        const len = data.length;
        console.log('len',len);
        if(len !=0 ){
            draw.代码 = 'sc1809';
            draw.类型 = type_choose;
            draw.getdata(data);
        }
    }
    assignData(data){
        console.log('getdata');
        const {assignData} = this.props;
        assignData(data);
        this.draw(data);
    }
    chooseType = type => () =>{
        const {...rest} = this.props;
        if(rest.type_choose != type){
            draw.loading();
            const index = rest.type_list.indexOf(type);
            let draw_data = [];
            switch (index){
                case 0:
                    draw_data = rest.data_0;
                    break;
                case 1:
                    draw_data = rest.data_1;
                    break;
                case 2:
                    draw_data = rest.data_2;
                    break;
            }
            console.log('draw_data',rest.data_0);
            rest.assignTypeChoose(type);
            if(draw_data.length != 0 ){
                this.draw(draw_data);
            }else{
                console.log(1);
                window.work.server.k线('sc1809', type, "");
            }
        }
    }
    render(){
        return(
            <div>
                <div onClick={this.chooseType("分时").bind(this)}>分时</div>
                <div onClick={this.chooseType("1分钟").bind(this)}>1分钟</div>
                <div onClick={this.chooseType("5分钟").bind(this)}>5分钟</div>
                <canvas id="k" style={{zoom:0.5,backgroundColor:"#20212b"}}></canvas>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_0:state.test.data_0,
    data_1:state.test.data_1,
    data_2:state.test.data_2,
    draw_data:state.test.draw_data,
    type_choose:state.test.type_choose,
    type_list:state.test.type_list,
})

const mapDispatchToProps = dispatch => ({
    assignData:(data) => {
        dispatch({
            type:'test/assignData',
            data:data
        })
    },
    assignTypeChoose:(type) => {
        dispatch({
            type:'test/assignTypeChoose',
            value:type
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(K)
