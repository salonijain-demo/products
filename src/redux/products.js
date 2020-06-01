import {get_products,cart_product,add_products,add_cart_products} from './products/action';
import Axios from 'axios';
import {add_product_api, get_products_api, edit_products_api, upload_api, upload_image_files_api,
  add_cart_products_api, get_specific_products_api, get_cart_products_api,delete_products_api} from '.././api';

export const addProduct = (products) => {
  return dispatch => {
    console.log(products)
    Axios.post(add_product_api, products)
    .then(res=>{
      let id = res.data.result.productId
      var imageData=new FormData()
      imageData.append('file',products.image)
      Axios.post(upload_api,imageData)
      .then(res=>{
        const data = res.data.originalname
        Axios.put(upload_image_files_api+id ,{data})
        .then(res=>{
          dispatch(add_products())
        })
      })
    })
  }
}

export const getProducts = () => {
  return dispatch=>{
    Axios.get(get_products_api)
    .then(res=>{
      dispatch(get_products(res.data))
    })
  }
}

export const editProducts = (id,product) => {
  return dispatch=>{
    if(product.editImage){
      var imageData=new FormData()
      imageData.append('file',product.image)
      Axios.post(upload_api,imageData)
      .then(res=>{
        const data = res.data.originalname
        Axios.put(upload_image_files_api+id ,{data})
      })
    }
    Axios.put(edit_products_api+id,product)
    .then(res=>{
      Axios.get(get_products_api)
      .then(res=>{
        dispatch(get_products(res.data))
      })
    })
  }
}

export const addCartProducts = (id) => {
  return dispatch=>{
    Axios.put(add_cart_products_api,{id})
    .then(res=>{
      dispatch(add_cart_products())
    })
  }
}

export const getCartProducts = () => {
  return dispatch=>{
    Axios.get(get_cart_products_api)
    .then(res=>{
      const carts = res.data[0].cart
      carts.map(id=>{
        Axios.get(get_specific_products_api+id)
        .then(res=>{
          const item = res.data[0]
          dispatch(cart_product(item))
        })
      })
    })
  }
}

export const deleteProducts = (id) => {
  return dispatch=>{
    Axios.put(delete_products_api+id)
    .then(res=>{
      Axios.get(get_products_api)
      .then(res=>{
        dispatch(get_products(res.data))
      })
    })
  }
}