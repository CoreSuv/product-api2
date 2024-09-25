import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);     // Obtener todos los productos

router.get("/products/:car_id", getProduct);  // Obtener un producto por id

router.post("/products", createProduct);  // Crear un producto

router.put("/products/:car_id", updateProduct); // Actualizar un producto por id

router.delete("/products/:car_id", deleteProduct);  // Eliminar un producto por id

export default router;