const db = require('../config/db');

exports.createOrder = async (req, res, next) => {
  let items = req.body.items;
  const user_id = req.user.id;
  const payment_screenshot = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Uploaded file:', req.file || 'None');

  // Parse items if it's a string
  if (typeof items === 'string') {
    try {
      items = JSON.parse(items);
    } catch (err) {
      console.error('Error parsing items JSON:', err.message);
      return res.status(400).json({ error: 'Invalid items format' });
    }
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log('Items validation failed:', items);
    return res.status(400).json({ error: 'Items array is required and must not be empty' });
  }

  try {
    // Validate items
    const parsedItems = items.map((item) => ({
      product_id: parseInt(item.product_id, 10),
      quantity: parseInt(item.quantity, 10),
    }));

    console.log('Parsed items:', JSON.stringify(parsedItems, null, 2));

    if (
      parsedItems.some(
        (item) => isNaN(item.product_id) || item.product_id <= 0 || isNaN(item.quantity) || item.quantity <= 0
      )
    ) {
      return res.status(400).json({ error: 'All items must have valid product_id and positive quantity' });
    }

    // Validate user
    db.query('SELECT id FROM users WHERE id = ?', [user_id], (err, userResults) => {
      if (err) {
        console.error('Database error fetching user:', err.message);
        return next(new Error('Failed to validate user'));
      }
      if (userResults.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch product details
      const productIds = parsedItems.map((item) => item.product_id);
      db.query(
        'SELECT id, price, quantity AS available_quantity FROM products WHERE id IN (?)',
        [productIds],
        (err, productResults) => {
          if (err) {
            console.error('Database error fetching products:', err.message);
            return next(new Error('Failed to fetch products'));
          }

          if (productResults.length !== productIds.length) {
            const foundIds = productResults.map((p) => p.id);
            const missingIds = productIds.filter((id) => !foundIds.includes(id));
            return res.status(404).json({ error: `Products not found: ${missingIds.join(', ')}` });
          }

          const products = productResults.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
          }, {});

          // Validate stock and calculate total
          let total_price = 0;
          for (const item of parsedItems) {
            const product = products[item.product_id];
            if (!product) {
              return res.status(404).json({ error: `Product with ID ${item.product_id} not found` });
            }
            if (item.quantity > product.available_quantity) {
              return res
                .status(400)
                .json({ error: `Requested quantity for product ${item.product_id} exceeds available stock` });
            }
            total_price += product.price * item.quantity;
          }

          // Log order values
          console.log('Order values:', { user_id, total_price, payment_screenshot, status: 'pending' });

          // Create order
          db.query(
            'INSERT INTO orders (user_id, total_price, payment_screenshot, status) VALUES (?, ?, ?, ?)',
            [user_id, total_price, payment_screenshot, 'pending'],
            (err, orderResult) => {
              if (err) {
                console.error('Database error creating order:', err.message);
                return next(new Error(`Failed to create order: ${err.message}`));
              }

              const order_id = orderResult.insertId;
              const orderItems = parsedItems.map((item) => {
                const product = products[item.product_id];
                if (!product || !product.price) {
                  throw new Error(`Invalid product data for product_id: ${item.product_id}`);
                }
                return [order_id, item.product_id, item.quantity, product.price];
              });

              console.log('Order items to insert:', JSON.stringify(orderItems, null, 2));

              // Insert order items
              db.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
                [orderItems],
                (err) => {
                  if (err) {
                    console.error('Database error creating order items:', err.message);
                    return next(new Error(`Failed to create order items: ${err.message}`));
                  }
                  res.status(201).json({ message: 'Order created successfully', order_id });
                }
              );
            }
          );
        }
      );
    });
  } catch (err) {
    console.error('Order creation error:', err.message);
    return next(new Error(`Order creation failed: ${err.message}`));
  }
};