import React,{Component} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {editProducts,deleteProducts} from '../../redux/products';
import {connect} from 'react-redux';
import '../../styles/product.css';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

class DialogBox extends Component{
  state={
    productId:'',
    title: '',
    price: '',
    discount: '',
    size: '',
    image: '',
    editImage: false
  }
  handleEvent=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleImage=(e)=>{
    this.setState({
      ...this.state,
      image: e.target.files[0]
    })
  }
  componentWillReceiveProps(nextprops){
    this.setState({
      productId: nextprops.edit.productId,
      title: nextprops.edit.title,
      price: nextprops.edit.price,
      discount: nextprops.edit.discount,
      size: nextprops.edit.size,
      image: nextprops.edit.image
    })
  }
  save = () => {
    this.props.editProducts(this.state.productId,this.state)
    this.props.onClose()
  }
  delete = () => {
    this.props.deleteProducts(this.state.productId)
    this.props.onClose()
  }
  render(){
    const {onClose, open} = this.props
    return(
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <button onClick={onClose} className='closeIcon'><CloseIcon /></button>
      <DialogTitle id="simple-dialog-title"></DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <div className='image-dialog-box'>
            <img className='dialog-img' src={`${process.env.PUBLIC_URL}/uploads/${this.state.image}`}></img>
            {!this.state.editImage ? <button className='createIcon' onClick={()=>{this.setState({editImage: !this.state.editImage})}}><CreateIcon /></button>: null}
            {this.state.editImage ? <input id="upload" ref="upload" type="file" accept="image/*" onChange={this.handleImage}/> : null}
          </div>
          <div className='dialog-textfield'>
            <TextField className='textfield' name='title' value={this.state.title} onChange={this.handleEvent}  label="Title" /><br></br>
            <TextField name='price' value={this.state.price} onChange={this.handleEvent} label="Price" /><br></br>
            <TextField name='discount' value={this.state.discount} onChange={this.handleEvent} label="Discount" /><br></br>
            <TextField name='size' value={this.state.size} onChange={this.handleEvent} label="Size" /><br></br>
          </div>
          <div className='footer dialog-buttons'>
            <Button variant="contained" color='primary' onClick={this.save}>save</Button>
            <Button variant="contained" color='secondary' onClick={this.delete}>delete</Button>
          </div>
        </form>
      </DialogContent>
      </Dialog>
    )
  }
}
const mapDispatchToProps={
  editProducts:editProducts,
  deleteProducts: deleteProducts
}

export default connect(null,mapDispatchToProps)(DialogBox)