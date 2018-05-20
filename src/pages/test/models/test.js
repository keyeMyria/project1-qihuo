export default {
    namespace:'test',
    state:{
        type_list:['分时','1分钟','5分钟'],
        type_choose:'分时',
        data_0:[],
        data_1:[],
        data_2:[],
        data_3:[],
        data_4:[],
        data_5:[],
    },
    reducers:{
        assignTypeChoose(state,{value}){
          return {
              ...state,
              type_choose:value
          }
        },
        assignData(state,{data}){
            const list = state.type_list;
            const type = state.type_choose;
            const index = list.indexOf(type);
            let new_data;
            if(state['data_'+index].length === 0){
                new_data = data;
            }else{
                new_data = data.length > 1 ? [...state['data_'+index],...data] : state['data_'+index];
            }
            return {
                ...state,
                ['data_'+index]:new_data,
            }
        }
    }
}
