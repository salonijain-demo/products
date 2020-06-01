import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import DialogBox from './Dialog';
import {Redirect} from 'react-router-dom';
import '../../styles/product.css';
import {addCartProducts} from '../../redux/products';
import {connect} from 'react-redux';

class Product extends Component{
  state={
    cart: false,
    open:false,
    edit: {}
  }
  handleClickOpen = (edited) => {
    this.state.edit = edited
    this.setState({open: !this.state.open});
  }
  handleClose = () => {
    this.setState({open: !this.state.open});
  }
  addCart=(id)=>{
    this.setState({
      cart: !this.state.cart,
    })
    this.props.addCartProducts(id)
  }
  render(){
    const {products} = this.props
    return(
      <div>
        {this.state.cart ? <Redirect to={`/cartProduct`} />:null}
        {products.map(product=>
          <div key={product.productId} className='col-lg-3 product-card'>
            <div className='product-image'>
              <img src={process.env.PUBLIC_URL+'uploads/'+product.image}/>
            </div>
            <div className='product-list'>
              <h3>{product.title}</h3>
              <h6>price:Rs{product.price}</h6>
              <h6>discount:{product.discount}%</h6>
              <h6>{product.size}</h6>
            </div>
            <div className='product-buttons'>
              <Button variant="contained" color='primary' onClick={()=>{this.handleClickOpen(product)}}>edit</Button>
              <Button variant="contained" color='secondary' onClick={()=>this.addCart(product.productId)}>add to cart</Button> 
            </div>
          </div>
        )}
        <DialogBox edit={this.state.edit} open={this.state.open} onClose={this.handleClose} />
      </div>
    )
  }
}
const mapDispatchToProps={
  addCartProducts:addCartProducts
}
export default connect(null,mapDispatchToProps)(Product)