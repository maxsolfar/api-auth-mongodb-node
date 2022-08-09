import Product from '../models/Product';

export const createProduct = async (req,res) =>{
  const {name, category, price, imgUrl} = req.body;
  const newProduct = new Product({name, category, price, imgUrl});
  const createdProduct = await newProduct.save();
  res.status(201).json(createdProduct);
}
export const getProducts = async (req,res) =>{
  const getProducts = await Product.find();
  res.status(200).json(getProducts);
}
export const getProductById = async (req,res) =>{
  const {productId} = req.params;
  const productById = await Product.findById(productId);
  res.status(200).json(productById);
}
export const updateProductById = async (req,res) =>{
  const {productId} = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.status(200).json(updatedProduct);
}
export const deleteProductById = async (req,res) =>{
  const {productId} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  res.status(200).json(deletedProduct);
}
