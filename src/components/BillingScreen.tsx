import React, { useState, useMemo, ChangeEvent } from 'react';

// Define interfaces for product and cart items
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number; // Placeholder for future stock management
}

interface CartItem extends Product {
  quantity: number;
}

// Dummy product data
const DUMMY_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1200, stock: 10 },
  { id: 'p2', name: 'Mouse', price: 25, stock: 50 },
  { id: 'p3', name: 'Keyboard', price: 75, stock: 30 },
  { id: 'p4', name: 'Monitor', price: 300, stock: 15 },
  { id: 'p5', name: 'Webcam', price: 50, stock: 20 },
  { id: 'p6', name: 'Headphones', price: 100, stock: 25 },
  { id: 'p7', name: 'USB Drive 64GB', price: 15, stock: 100 },
  { id: 'p8', name: 'External SSD 1TB', price: 150, stock: 12 },
];

const BillingScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return DUMMY_PRODUCTS;
    return DUMMY_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate cart totals
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercentage) / 100;
  }, [subtotal, discountPercentage]);

  const total = useMemo(() => {
    return subtotal - discountAmount;
  }, [subtotal, discountAmount]);

  // Event Handlers
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setDiscountPercentage(value);
    } else if (event.target.value === '') {
      setDiscountPercentage(0);
    }
  };

  const handleCheckout = (type: 'regular' | 'khata') => {
    if (cart.length === 0) {
      alert('Cart is empty. Please add products before checking out.');
      return;
    }

    console.log(`--- ${type === 'regular' ? 'REGULAR SALE' : 'ADD TO KHATA'} ---`);
    console.log('Cart Items:', cart);
    console.log('Subtotal:', subtotal.toFixed(2));
    console.log('Discount:', discountAmount.toFixed(2));
    console.log('Total:', total.toFixed(2));

    alert(`Checkout successful for ${type === 'regular' ? 'Regular Sale' : 'Add to Khata'}!
Total: ${total.toFixed(2)}`);

    // Reset state after checkout
    setCart([]);
    setSearchTerm('');
    setDiscountPercentage(0);
  };

  return (
    <div style={styles.container}>
      {/* Left Panel: Product Search and Add */}
      <div style={styles.leftPanel}>
        <h2 style={styles.panelTitle}>Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <div style={styles.productList}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} style={styles.productItem}>
                <span>{product.name} - ${product.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(product)} style={styles.addButton}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      {/* Right Panel: Cart Contents, Totals, Checkout */}
      <div style={styles.rightPanel}>
        <h2 style={styles.panelTitle}>Cart</h2>
        <div style={styles.cartItemsContainer}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <span style={{ flex: 3 }}>{item.name}</span>
                <span style={{ flex: 1 }}>${item.price.toFixed(2)}</span>
                <div style={styles.quantityControls}>
                  <button onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>-</button>
                  <span style={styles.quantityDisplay}>{item.quantity}</span>
                  <button onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>+</button>
                </div>
                <span style={{ flex: 1, textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => handleRemoveFromCart(item.id)} style={styles.removeButton}>X</button>
              </div>
            ))
          )}
        </div>

        <div style={styles.summaryContainer}>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Discount (%):</span>
            <input
              type="number"
              value={discountPercentage}
              onChange={handleDiscountChange}
              min="0"
              max="100"
              step="5"
              style={styles.discountInput}
            />
            <span>(-${discountAmount.toFixed(2)})</span>
          </div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div style={styles.checkoutButtons}>
          <button onClick={() => handleCheckout('regular')} style={{ ...styles.checkoutButton, backgroundColor: '#4CAF50' }}>
            Regular Sale
          </button>
          <button onClick={() => handleCheckout('khata')} style={{ ...styles.checkoutButton, backgroundColor: '#008CBA' }}>
            Add to Khata
          </button>
        </div>
      </div>
    </div>
  );
};

// Basic inline styles for a functional layout
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f6',
    color: '#333',
  },
  leftPanel: {
    flex: 1,
    padding: '20px',
    borderRight: '1px solid #ddd',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  rightPanel: {
    flex: 1.2,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: {
    fontSize: '1.8em',
    marginBottom: '20px',
    color: '#2c3e50',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  searchInput: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
  },
  productList: {
    flexGrow: 1,
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px dashed #eee',
  },
  addButton: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.2s ease',
  },
  cartItemsContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px dotted #eee',
    fontSize: '0.9em',
    gap: '10px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    flex: 1.5,
    justifyContent: 'center',
  },
  quantityButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    margin: '0 5px',
    fontSize: '0.8em',
  },
  quantityDisplay: {
    minWidth: '20px',
    textAlign: 'center',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.8em',
  },
  summaryContainer: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #ddd',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    fontSize: '1.1em',
  },
  totalRow: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#2c3e50',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    marginTop: '10px',
  },
  discountInput: {
    width: '60px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: '10px',
  },
  checkoutButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #ddd',
  },
  checkoutButton: {
    flex: 1,
    padding: '15px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  },
};

export default BillingScreen;
