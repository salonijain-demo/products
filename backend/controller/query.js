const models = require('../model/schema');

exports.addProducts = async function(req, res){
    const newProduct = new models.Product ({
      ...req.body
    })
        
    let count = await models.Product.count()
    newProduct['productId'] = `PI${++count}`
        
    const result = await newProduct.save()
    res.send({ result })
}

exports.getAllProducts = async function(req, res){
  await models.Product.find({},function(err,task){
    if(err){
      res.send(err)
    } if(task){
      res.send(task)
    }
  })
}

exports.editProducts = async function(req, res){
  await models.Product.findOneAndUpdate({ productId: req.params.productId },{title:req.body.title,
    price:req.body.price,discount:req.body.discount,size:req.body.size},{new:true}, function(err,task){
    if(err){
      res.send(err)
    } if(task){
      res.send(task)
    }
  })
}

exports.uploadImageFiles = async function(req, res) {
  await models.Product.findOneAndUpdate({ productId: req.params.productId }, { image: req.body.data}, { new: true }, function(err, task) {
    if (task) {
      res.send(task);
    }
    if (err) {
      res.send(err);
    }
  })
}

exports.addCartProducts=async function(req,res){
  if(req.body.id != null){
    let count = await models.Cart.count()
    if(count == 0){
      const newCart = new models.Cart({
        ...req.body
      })
      newCart['cartId'] = `CI1`
      await newCart.save()
    }
    await models.Cart.findOneAndUpdate({cartId:'CI1'},{$addToSet: {cart:req.body.id}},function(err,task){
      if(err){
        res.send(err)
      } if(task){
        res.send(task)
      }
    })
  }
}

exports.getCartProducts = async function(req, res){
  await models.Cart.find({},function(err,task){
    if(err){
      res.send(err)
    } if(task){
      res.send(task)
    }
  })
}

exports.getSpecificProduct = async function(req, res){
  await models.Product.find({ productId: req.params.productId },function(err,task){
    if(err){
      res.send(err)
    } if(task){
      res.send(task)
    }
  })
}

exports.deleteProducts = async function(req, res){
  await models.Product.deleteOne({ productId: req.params.id },function(err,task){
    if(err){
      res.send(err)
    } if(task){
      res.send(task)
    }
  })
}