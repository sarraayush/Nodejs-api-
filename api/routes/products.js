const express = require('express');
const router = express.Router();


const mongoose  = require('mongoose');
const multer = require('multer');
const upload = multer({dest : 'uploads/'});
const Product = require('../models/product');
router.get('/', (req, res, next) => {

    Product.find()
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
       res.status(500).json({
        error : err
       });
    });

    res.status(200).json({
        message : "Handling Get request with /products"
    });
});


router.post('/', upload.single('productImage'), (req, res, next) => {
      
    // const product = {
        
    //     name : req.body.name,
    //     price : req.body.price

    // };
    console.log(req.file);
    const product = new Product({
       _id : mongoose.Types.objectId(),
       name : req.body.name,
       price : req.body.price
    });

    product.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message : "Handling POST request with /products",
            createdProduct : product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

    
});

router.get('/:productId', (req , res , next)=>{

    const id = req.params.productId;
    Product.findById(id).exec().then(
        doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
    }
);

router.patch('/:productId', (req , res , next)=>{

    const id = req.params.productId;
    const updateProps = {};
    for(const pair of req.body)
    {
        updateProps[pair.propName] = pair.value;
    }
    Product.update({_id : id}, {$set : updateProps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
    // Product.update({_id : id}, {$set : {name : req.body.newName , price : req.body.newPrice}});
    // res.status(200).json({
    //     message : "updated product"
    // });
});

router.delete('/:productId', (req , res , next)=>{

    // res.status(200).json({
    //     message : "deleted product"
    // });
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(res=>{
        console.log("Successfully deleted");
        res.status(200).json(res);
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        });
    });
});



module.exports = router;