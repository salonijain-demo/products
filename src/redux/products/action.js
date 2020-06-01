import {ADD_PRODUCTS,GET_PRODUCTS,ADD_CART_PRODUCTS,CART_PRODUCT} from './type';

export const add_products = () => ({
  type: ADD_PRODUCTS
})

export const get_products = (products) => ({
  type: GET_PRODUCTS,
  payload: products
})

export const add_cart_products = () => ({
  type: ADD_CART_PRODUCTS
})

export const cart_product = (product) => ({
  type: CART_PRODUCT,
  payload: product
})