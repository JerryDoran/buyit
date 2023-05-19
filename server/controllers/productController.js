import Product from '../models/Product';
import APIFilters from '../lib/APIFilters';

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
