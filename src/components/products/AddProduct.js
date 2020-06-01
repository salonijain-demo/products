import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addProduct} from '../../redux/products';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom';

class AddProduct extends Component{
  state={
    title: '',
    price: '',
    discount: '',
    size: '',
    image: '',
    showProduct: false
  }
  handleEvent=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  addProduct=()=>{
    this.props.addProduct(this.state)
    this.setState({
      showProduct: true
    })
  }
  handleImage=(e)=>{
    this.setState({
      ...this.state,
      image: e.target.files[0]
    })
  }
  render(){
    return(
      <div>
        {this.state.showProduct ? <Redirect to='/'/> : null}
        <div className='product-header col-lg-12'>
          <h1><b>Add Product</b></h1>
          <Link to='/'>See Product</Link>
          <Link to='/cartProduct' className='cartProduct'>See your cart products</Link>
        </div>
        <div className='add-product col-lg-3'>
          <form noValidate autoComplete="off">
            <TextField className='col-lg-12' name='title' value={this.state.title} onChange={this.handleEvent} label="Title" /><br></br>
            <TextField className='col-lg-12' name='price' value={this.state.price} onChange={this.handleEvent} label="Price" /><br></br>
            <TextField className='col-lg-12' name='discount' value={this.state.discount} onChange={this.handleEvent} label="Discount" /><br></br>
            <TextField className='col-lg-12' name='size' value={this.state.size} onChange={this.handleEvent} label="Size" /><br></br>
            <input id="upload" ref="upload" type="file" accept="image/*" capture='camera' onChange={this.handleImage}/>
          </form>
          <div className='buttons'>
            <Button variant="contained" color='primary' onClick={this.addProduct}>Add</Button>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps={
  addProduct:addProduct
}
export default connect(null,mapDispatchToProps)(AddProduct)