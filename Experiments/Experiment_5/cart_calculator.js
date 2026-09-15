const readline = require("readline");

// Sample catalog
const catalog = {
  1: { name: "Wireless Mouse", price: 25.00 },
  2: { name: "Mechanical Keyboard", price: 80.00 },
  3: { name: "Notebook", price: 5.00 },
  4: { name: "USB-C Cable", price: 12.00 }
};

// Available promos
const promoCodes = {
  SAVE10: 0.10, // 10% off
  SAVE20: 0.20  // 20% off
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userCart = [];

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function calculateTotal(cartItems, promoCode = "") {
  // Array.prototype.reduce() to calculate raw subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Discount calculation using object lookup
  const discountRate = promoCodes[promoCode.toUpperCase()] || 0;
  const discountAmount = subtotal * discountRate;
  
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  return {
    subtotal: subtotal.toFixed(2),
    discount: discountAmount.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  };
}

async function startShoppingSession() {
  console.log("\n--- AVAILABLE PRODUCTS ---");
  Object.entries(catalog).forEach(([id, item]) => {
    console.log(`${id}. ${item.name} - $${item.price.toFixed(2)}`);
  });

  // Loop to collect item inputs from the user
  let addingItems = true;
  while (addingItems) {
    const choice = await askQuestion("\nEnter Product ID to add to cart (or press Enter to finish): ");
    
    if (!choice.trim()) {
      addingItems = false;
      break;
    }

    if (!catalog[choice]) {
      console.log("Invalid ID. Please try again.");
      continue;
    }

    const qtyInput = await askQuestion(`Enter quantity for ${catalog[choice].name}: `);
    const quantity = parseInt(qtyInput, 10);

    if (isNaN(quantity) || quantity <= 0) {
      console.log("Invalid quantity. Skipping item.");
      continue;
    }

    // Add object to cart array
    userCart.push({
      ...catalog[choice], // Spread object properties (id, name, price)
      quantity
    });

    console.log(`Added ${quantity} x ${catalog[choice].name} to cart.`);
  }

  if (userCart.length === 0) {
    console.log("\nCart is empty. Exiting.");
    rl.close();
    return;
  }

  // Ask for promo code input
  const promoInput = await askQuestion("\nEnter promo code (e.g. SAVE10, SAVE20 or Enter to skip): ");

  // Generate calculations
  const summary = calculateTotal(userCart, promoInput.trim());

  // Print Receipt
  console.log("\n================ RECEIPT ================");
  userCart.forEach(({ name, price, quantity }) => { // Object destructuring
    console.log(`${name} x${quantity} @ $${price.toFixed(2)} = $${(price * quantity).toFixed(2)}`);
  });
  console.log("-----------------------------------------");
  console.log(`Subtotal: $${summary.subtotal}`);
  console.log(`Discount: -$${summary.discount}`);
  console.log(`Tax (8%): $${summary.tax}`);
  console.log(`TOTAL:    $${summary.total}`);
  console.log("=========================================\n");

  rl.close();
}

startShoppingSession();