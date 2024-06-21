import {request, response} from "express";
import { addProductInCartServices, createCartServices, deleteCartServices, deleteProductInCartServices, getCartByIdServices, updateProductInCartServices } from "../services/cart.services.js";

export const getCartById = async (req = request, res = response)=>{
    try {
        const { cid } = req.params;
        const carrito = await getCartByIdServices(cid);
        if (!carrito)
        return res.json(carrito); 
        return res.status(404).json({msg:`el carrito con id ${cid} no existe`})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
    }
}

export const createCart = async (req = request, res = response)=>{
    try {
        const carrito = await createCartServices();
        return res.json({msg:'carrito creado', carrito})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
        
    }
}

export const addProductInCart = async (req = request, res = response)=>{
    try {
        const { cid, pid } = req.params; 

        const carrito = await addProductInCartServices(cid, pid); 

        if(!carrito)

        return res.status(404).json({msg : `el carrito con id ${cid} no existe!`});

        return res.json({msg: 'Carrito actualizado!', carrito});

    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
        
    }
}

export const deleteProductInCart = async (req = request, res = response) => {
    try {
        const {cid,pid} = req.params;
        const carrito = await deleteProductInCartServices(cid, pid);
        if(!carrito)
        return res.status(404).json({msg: 'no se pudo realizar la opreacion'});
        return res.json({msg: 'producto eliminado del carrito', carrito})

    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
    }
}

export const updateProductInCart = async (req = request, res = response) => {
    try {
        const {cid,pid} = req.params;
        const {quantity} = req.body;

        if(!quantity || !Number.isInteger(quantity)) 
        return res.status(404).json({msg:'la propiedad quantity es obligatoria y debe ser un numero entero'});

        const carrito = await updateProductInCartServices(cid, pid, quantity);
        if(!carrito)
        return res.status(404).json({msg:'no se pudo realizar la opreacion'});
        return res.json({msg:'Producto actualizado en el carrito', carrito});

    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
    }
}

export const  deleteCart = async (req = request, res = response) => {
    try {
        const {cid} = req.params;

        const carrito = await deleteCartServices(cid);
        if(!carrito)
        return res.status(404).json({msg:'no se pudo realizar la opreacion'});
        return res.json({msg:'Producto actualizado en el carrito', carrito});

    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'});
    }
}