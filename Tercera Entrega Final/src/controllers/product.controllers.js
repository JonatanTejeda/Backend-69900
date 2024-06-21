import { request, response } from "express";
import { addProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/products.services.js";

export const getProducts = async (req = request, res = response) => {
    try {

        const result = await getProductsService(...req.query);

        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const producto = await  getProductByIdService(pid);
        if (!producto) {
            return res.status(404).json({ msg: `El producto con id ${pid} no existe` });
        }
        return res.json({ producto });
    } catch (error) {
        console.log('getProductById -> ', error);
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, category, code, stock } = req.body;
        if (!title || !description || !price || !category || !code || !stock) {
            return res.status(400).json({ msg: 'Los campos [title, description, price, category, code, stock] son obligatorios' });
        }
        const producto = await addProductService({...req.body});
        return res.status(201).json({ producto });
        
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const { id, ...rest } = req.body;
        const producto = await updateProductService(pid, rest);
        if (!producto) {
            return res.status(404).json({ msg: `No se pudo actualizar el producto con id ${pid}` });
        }
        return res.json({ msg: 'Producto actualizado', producto });
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const producto = await deleteProductService(pid);
        if (!producto) {
            return res.status(404).json({ msg: `No se pudo eliminar el producto con id ${pid}` });
        }
        return res.json({ msg: 'Producto eliminado', producto });
    } catch (error) {
        console.log('deleteProduct -> ', error);
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};
