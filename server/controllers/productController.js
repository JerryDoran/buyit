import Product from '../models/Product';
import APIFilters from '../lib/APIFilters';
import { uploads } from '../lib/cloudinary';
import fs from 'fs';

export async function createProduct(req, res, next) {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({ product });
}

export async function allProducts(req, res, next) {
  // e.g. req.query = ?category=laptop
  // or e.g. req.query = ?category=laptop&ratings=4

  const resPerPage = 3;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  res
    .status(200)
    .json({ productsCount, resPerPage, filteredProductsCount, products });
}

export async function singleProduct(req, res, next) {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    res
      .status(404)
      .json({ error: `Product not found with id ${req.query.productId}` });
  }

  res.status(200).json({ product });
}

export async function uploadProductImages(req, res, next) {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    res
      .status(404)
      .json({ error: `Product not found with id ${req.query.productId}` });
  }
  const uploader = async (path) => await uploads(path, 'buyit/products');

  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const imageUrl = await uploader(path);
    urls.push(imageUrl);
    fs.unlinkSync(path); //deletes file from my uploads folder
  }

  product = await Product.findByIdAndUpdate(req.query.productId, {
    images: urls,
  });

  // console.log('Urls', urls, 'Product', product);

  res.status(200).json({ data: urls, product });
}
