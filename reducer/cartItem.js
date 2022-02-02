const cartItem = ( state = [] , action ) =>{
    switch(action.type){
        case 'ADD_TO_CART':{
                return [...state,action.payload]
            }
        case 'REMOVE_FROM_CART':{
                return state.filter( cartItem => cartItem.atitle !== action.payload.atitle)
        }
        return state
    }
}

export default cartItem