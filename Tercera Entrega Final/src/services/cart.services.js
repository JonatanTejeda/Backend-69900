import { cartModel } from "../models/carts.js";



export const getCartByIdServices = async (cid)=>{
    try {
        return  await cartModel.findById(cid).populate('products.id').lean();
    } catch (error) {
        console.log('getCartByIdServices -> ', error);
        throw error;
    }
}
export const createCartServices = async ()=>{
    try {
        return await cartModel.create({});
    } catch (error) {
        console.log('createCartServices -> ', error);
        throw error;
        
    }
}

export const addProductInCartServices = async (cid, pid)=>{
    try {
        

        const carrito = await cartModel.findById(cid); 

        if(!carrito)

        return null;

        const productoInCart = carrito.products.find(p => p.id.toString() === pid);

        if(productoInCart)
        productoInCart.quantity ++;
        else    
        carrito.products.push({id:pid, quantity: 1});

        carrito.save();
        return carrito;

    } catch (error) {
        console.log('addProductInCartServices -> ', error);
        throw error;
        
    }
}

export const deleteProductInCartServices = async (cid, pid)=> {
 try {
     return await cartModel.findByIdAndUpdate(cid,{$pull:{'products':{id:pid}}},{new:true});
 } catch (error) {
    console.log('deleteProductInCartServices -> ', error);
    throw error;
 }
}

export const updateProductInCartServices = async (cid, pid, quantity)=> {
    try {
        return await cartModel.findOneAndUpdate(
            {_id:cid, 'products.id':pid},
            {$set: {'products.$.quantity':quantity}},
            {new:true}
        );
    } catch (error) {
       console.log('updateProductInCart -> ', error);
       throw error;
    }
   }


export const deleteCartServices = async (cid)=> {
    try {
        return await cartModel.findByIdAndUpdate(cid,{$set:{'products':[]}},{new:true});
        // return await cartModel.findByIdInDelete(cid);
    } catch (error) {
       console.log('deleteProductInCartServices -> ', error);
       throw error;
    }
}