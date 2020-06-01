import React,{Component} from 'react';
import {addCartProducts,getCartProducts} from '../../redux/products';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const products=[]

class ProductCart extends Component{
  componentDidMount(){
    this.props.getCartProducts()
  }
  componentDidUpdate(){
    products.push(this.props.cartProduct)
  }
  render(){
    return(
      <div>
        <div className='product-header col-lg-12'>
          <h1><b>Cart Products</b></h1>
          <Link to='/'>See Products</Link>
          <Link to='/addProduct' className='cartProduct'>Add Product</Link>
        </div>
        {products.map(product=>
          <div key={product[0].productId} className='col-lg-3 product-card'>
            <div className='product-image'>
              <img src={process.env.PUBLIC_URL+'uploads/'+product[0].image}/>
            </div>
            <div className='product-list'>
              <h3>{product[0].title}</h3>
              <h6>price:Rs{product[0].price}</h6>
              <h6>discount:{product[0].discount}%</h6>
              <h6>{product[0].size}</h6>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartProduct: state.cartProduct
})

const mapDispatchToProps={
  addCartProducts: addCartProducts,
  getCartProducts: getCartProducts
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCart)