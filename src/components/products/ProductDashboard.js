import React, {Component} from 'react';
import Product from './Product';
import {Link} from 'react-router-dom';
import '../.././styles/product.css';
import {getProducts} from '../../redux/products';
import {connect} from 'react-redux';

class ProductDashboard extends Component{
  componentDidMount(){
    this.props.getProducts()
  }
  render(){
    return(
      <div>
        <div className='product-header col-lg-12'>
          <h1><b>Products</b></h1>
          <Link to='/addProduct'>Add Product</Link>
          <Link to='/cartProduct' className='cartProduct'>See your cart products</Link>
        </div>
        <Product products={this.props.products}/>
      </div>
    )
  }
}
const mapStateToProps=(state)=>({
  products: state.products
})
const mapDispatchToProps={
  getProducts:getProducts
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductDashboard)