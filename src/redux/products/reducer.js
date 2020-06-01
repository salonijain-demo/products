import {ADD_PRODUCTS,ADD_CART_PRODUCTS,GET_PRODUCTS,CART_PRODUCT} from './type';

const initialState={
  products:[],
  cartProduct: []
}
const Reducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_PRODUCTS: return{
      ...state
    }
    case GET_PRODUCTS: return{
      ...state,
      products: action.payload
    }
    case ADD_CART_PRODUCTS: return{
      ...state
    }
    case CART_PRODUCT: return{
      ...state,
      cartProduct: initialState.cartProduct.concat(action.payload)
    }
    default: return state
  }
}

export default Reducer