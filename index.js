let express = require('express');
let cors = require('cors');
let port = 3000;
let app = express();
app.use(cors());

app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// function to add items to the cart
function addItemsToCart(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });

  return cart;
}

// Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItemsToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

// function to edit quantity of an item
function updateItemQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateItemQuantity(cart, productId, quantity);
  res.json({ cartItems: result });
});

// function to delete cart items
function filterCartItems(item, productId) {
  return item.productId !== productId;
}
// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((item) => filterCartItems(item, productId));
  cart = result;
  res.json({ cartItems: result });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// function to calculate total quantity
function calculateQuantityOfItems(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}
// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateQuantityOfItems(cart);
  res.json({ totalQuantity: totalQuantity });
});

// function to calculate total price of items in cart
function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
