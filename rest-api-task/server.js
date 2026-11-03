const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use(express.json());
let products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
  { id: 2, name: 'Coffee Maker', price: 80, category: 'Appliances' },
  { id: 3, name: 'Running Shoes', price: 110, category: 'Sports' }
];
app.apiName = 'Products API';
app.get('/api/products', (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined || !category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, price, and category for the product.'
    });
  }

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: name.trim(),
    price: Number(price),
    category: category.trim()
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data: newProduct
  });
});
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  const { name, price, category } = req.body;

  if (!name || price === undefined || !category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, price, and category to update.'
    });
  }

  products[productIndex] = {
    id: productId,
    name: name.trim(),
    price: Number(price),
    category: category.trim()
  };

  res.status(200).json({
    success: true,
    message: 'Product updated successfully.',
    data: products[productIndex]
  });
});
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${productId} not found.`
    });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully.',
    data: deletedProduct[0]
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});