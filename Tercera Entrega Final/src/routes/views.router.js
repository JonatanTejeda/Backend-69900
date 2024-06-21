import { Router } from 'express';
import { getCartByIdServices } from '../services/cart.services.js';
import { getProductsService } from '../services/products.services.js';

const routerV = Router()


routerV.get("/",async(req,res)=>{
    const {payload} = await getProductsService({});
    return res.render ('home', { productos: payload, styles: 'styles.css', title: 'Home'});
    
})

routerV.get("/realtimeproducts",(req,res)=>{
    return res.render("realtimeproducts" , {title: 'Real Time', styles: 'styles.css'});
})


routerV.get('/products', async (req,res)=>{
    const result = await getProductsService({...req.query});
    return res.render('products',{title: 'productos', result})
})

routerV.get('/cart/:cid', async (req,res)=>{
    const {cid} = req.params;
    const carrito = await getCartByIdServices (cid);
    return res.render ('cart',{title:'carrito', carrito});
})


export default routerV