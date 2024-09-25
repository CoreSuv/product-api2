import { getConnection } from "../database/db.js";
import sql from "mssql";

export const getProducts = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM products");
    res.json(result.recordset);
};

export const getProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('car_id', sql.Int, req.params.car_id)
        .query('SELECT * FROM products WHERE car_id = @car_id');

    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Car not found" });
    }
    return res.json(result.recordset[0]);
}

export const createProduct = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('brand', sql.VarChar, req.body.brand)
        .input('model', sql.VarChar, req.body.model)
        .input('year', sql.Int, req.body.year)
        .input('price', sql.Decimal, req.body.price)
        .input('kilometers', sql.Int, req.body.kilometers)
        .input('type', sql.VarChar, req.body.type)
        .input('color', sql.VarChar, req.body.color)
        .input('fuel_type', sql.VarChar, req.body.fuel_type)
        .input('transmission', sql.VarChar, req.body.transmission)
        .input('images', sql.TEXT, req.body.images)
        .input('description', sql.TEXT, req.body.description)
        .query('INSERT INTO products (brand, model, year, price, kilometers, type, color, fuel_type, transmission, images, description) VALUES (@brand, @model, @year, @price, @kilometers, @type, @color, @fuel_type, @transmission, @images, @description); SELECT SCOPE_IDENTITY() AS car_id');
    console.log(result);
    res.json({ car_id: result.recordset[0].car_id, brand: req.body.brand, model: req.body.model, year: req.body.year, price: req.body.price, kilometers: req.body.kilometers, type: req.body.type, color: req.body.color, fuel_type: req.body.fuel_type, transmission: req.body.transmission, images: req.body.images, description: req.body.description });
}

export const updateProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('car_id', sql.Int, req.params.car_id)
        .input('brand', sql.VarChar, req.body.brand)
        .input('model', sql.VarChar, req.body.model)
        .input('year', sql.Int, req.body.year)
        .input('price', sql.Decimal, req.body.price)
        .input('kilometers', sql.Int, req.body.kilometers)
        .input('type', sql.VarChar, req.body.type)
        .input('color', sql.VarChar, req.body.color)
        .input('fuel_type', sql.VarChar, req.body.fuel_type)
        .input('transmission', sql.VarChar, req.body.transmission)
        .input('images', sql.TEXT, req.body.images)
        .input('description', sql.TEXT, req.body.description)
        .query('UPDATE products SET brand = @brand, model = @model, year = @year, price = @price, kilometers = @kilometers, type = @type, color = @color, fuel_type = @fuel_type, transmission = @transmission, images = @images, description = @description WHERE car_id = @car_id');

    console.log(result);
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Car not found" });    
    }
    res.json({
        car_id: req.params.car_id,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        kilometers: req.body.kilometers,
        type: req.body.type,
        color: req.body.color,
        fuel_type: req.body.fuel_type,
        transmission: req.body.transmission,
        images: req.body.images,
        description: req.body.description
    });
}

export const deleteProduct = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input("car_id", sql.Int, req.params.car_id)
        .query("DELETE FROM products WHERE car_id = @car_id");

    console.log(result);

    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Car not found" });
    }
    return res.json({ message: "Car deleted" });
}