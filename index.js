const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

//Server side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 points per $1

//Calulating the total Cart price
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
});

//Applying MemberShip Discount
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discountPrice;
  let isMember = req.query.isMember === 'true';
  if (isMember) {
    discountPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    discountPrice = cartTotal;
  }

  res.send(discountPrice.toString());
});

//Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount = (cartTotal * taxRate) / 100;
  res.send(cartAmount.toString());
});

//Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days;
  if (shippingMethod === 'standard') {
    days = distance / 50;
  } else if (shippingMethod === 'express') {
    days = distance / 100;
  }

  res.send(days.toString());
});

//Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let price = weight * distance * 0.1;
  res.send(price.toString());
});

//Calculating loyalty points
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
