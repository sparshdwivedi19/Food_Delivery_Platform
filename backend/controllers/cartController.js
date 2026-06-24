import userModel from "../models/userModel.js"

// add to cart item

const addToCart = async (req , res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]++;
        }
       await userModel.findByIdAndUpdate(req.body.userId , {cartData})
        res.json({success:true , message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error"})
    }

}

// remove cart item

const removeFromCart = async(req , res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId] --;
        }
        await userModel.findByIdAndUpdate(req.body.userId , {cartData});
        res.json({success:true , message:"Removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error"})
    }
}

// list cart item

const getCart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        
        // Remove items with quantity 0 or less
        const cleanedCartData = {};
        for (let itemId in cartData) {
            if (cartData[itemId] > 0) {
                cleanedCartData[itemId] = cartData[itemId];
            }
        }
        
        res.json({success:true , cartData: cleanedCartData})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error"})
    }
}

export {addToCart , removeFromCart , getCart};