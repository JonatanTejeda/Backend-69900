import {Router} from "express"
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controllers.js"
import { __dirname } from "../utils.js"

const routerP =Router()

routerP.get("/",getProducts)
routerP.get("/:pid", getProductById);
routerP.post("/", addProduct);
routerP.put("/:pid", updateProduct);
routerP.delete("/:pid", deleteProduct);

export default routerP