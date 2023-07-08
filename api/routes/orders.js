const express = require('express'); //

const router = express.Router();

router.get('/', (req , res , next)=>{

     res.status(200).json({
       message : "This is get request to order"
     });
});

router.post('/', (req , res , next)=>{
    
    const order = {
      productId : req.body.productId,
      quantity : req.body.quantity
    }
    res.status(200).json({
      message : "This is post request to order",
      CreatedOrder : order
    });
});


router.get('/:someid', (req , res , next)=>{
      
      const id = req.params.someid;
      if(id =='maiadminhu')
      {
        res.status(200).json({
            message :"mai admin hu"
        });
      }
      else
      {
        res.status(200).json({
            message : "bhakk saale tu admin nhi hai"
        });
      }
});

router.delete('/:someid', (req , res , next)=>{
       
        res.status(200).json({
            message : "order is deleted"
        })
});


module.exports = router;