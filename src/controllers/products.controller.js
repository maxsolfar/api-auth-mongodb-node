import Product from "../models/Product";

export const createProduct = async (req, res) => {
  const { name, category, price, imgUrl } = req.body;
  try {
    const newProduct = new Product({ name, category, price, imgUrl });
    const createdProduct = await newProduct.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getProducts = async (req, res) => {
  try {
    const getProducts = await Product.find();
    return res.status(200).json(getProducts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const productById = await Product.findById(productId);
    return res.status(200).json(productById);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
