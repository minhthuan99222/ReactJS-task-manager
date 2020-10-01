import * as types from '../contants/ActionTypes'


var initialState = []



const products = (state=initialState, action)=>{
    switch(action.type){
        case types.FETCH_PRODUCTS:
            state = action.products;
            return [...state]

        case types.DELETE_PRODUCT:
            var index = findIndex(state, action.id)
            if (index !== -1){
                state.splice(index, 1)
            }
            return [...state]

        case types.ADD_PRODUCT:
            state.push(action.product)
            return[...state] 
        case types.UPDATE_PRODUCT: 
            var index = findIndex(state, action.product.id)
            if (index !== -1){
                state[index]=action.product
            }
            return [...state]
        default:
            return [...state]
    }
        
}
var findIndex = (products, id) =>{
    var result = -1;
    if(products.length > 0){
        for(var i = 0; i< products.length; i++){
            if(products[i].id===id)
            {
                result = i
                break
            }
        }
    }
    return result
}

export default products;