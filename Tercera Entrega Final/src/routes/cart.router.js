import {Router} from "express"
import { addProductInCart, createCart, deleteCart, deleteProductInCart, getCartById, updateProductInCart } from "../controllers/cart.controllers.js"


const routerC =Router()


routerC.get("/:cid",getCartById)
routerC.post("/", createCart);
routerC.post("/:cid/product/:pid", addProductInCart);
routerC.delete('/:cid/products/:pid', deleteProductInCart);
routerC.put('/:cid/products/:pid', updateProductInCart);  
routerC.delete('/:cid', deleteCart);  

export default routerC