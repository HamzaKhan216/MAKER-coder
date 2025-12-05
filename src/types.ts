/**
 * Represents a product available in the inventory.
 */
export interface Product {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Detailed description of the product
  price: number; // Current selling price per unit
  stock: number; // Current stock level available
  category: string; // Product category (e.g., 'Electronics', 'Groceries', 'Apparel')
  imageUrl?: string; // Optional URL for the product image
  sku: string; // Stock Keeping Unit, a unique product code
}

/**
 * Represents an item within a shopping cart or a transaction.
 */
export interface CartItem {
  productId: string; // The ID of the product being purchased
  quantity: number; // The quantity of this product in the cart/transaction
  priceAtTimeOfAddition: number; // The price of the product when it was added, for historical accuracy
}

/**
 * Represents a sales transaction made by a customer.
 */
export interface Transaction {
  id: string; // Unique identifier for the transaction
  timestamp: number; // Unix epoch timestamp (milliseconds) when the transaction occurred
  items: CartItem[]; // List of items included in this transaction
  totalAmount: number; // The total monetary amount of the transaction
  paymentMethod: 'Credit Card' | 'Cash' | 'PayPal' | 'Stripe' | 'Bank Transfer' | 'Other'; // Method used for payment
  status: 'pending' | 'completed' | 'cancelled' | 'refunded'; // Current status of the transaction
}

/**
 * Represents a contact person or entity, such as a customer, supplier, or employee.
 */
export interface Contact {
  id: string; // Unique identifier for the contact
  name: string; // Full name of the contact
  email?: string; // Optional email address
  phone?: string; // Optional phone number
  address?: string; // Optional full address string
  type: 'customer' | 'supplier' | 'employee' | 'other'; // Type of contact
}

/**
 * Represents a single entry in the financial ledger.
 */
export interface LedgerEntry {
  id: string; // Unique identifier for the ledger entry
  timestamp: number; // Unix epoch timestamp (milliseconds) for when the entry was recorded
  type: 'credit' | 'debit'; // Type of financial entry (credit increases balance, debit decreases - depends on account type)
  amount: number; // The monetary amount of the entry
  description: string; // A brief description of the ledger entry
  relatedTransactionId?: string; // Optional ID of a transaction this entry relates to
  accountId: string; // The specific account affected (e.g., 'cash', 'bank_checking', 'sales_revenue', 'accounts_receivable')
}

/**
 * Defines the possible major views or pages within the application UI.
 */
export type View = 'dashboard' | 'products' | 'transactions' | 'cart' | 'contacts' | 'ledger' | 'settings';

/**
 * Defines the possible UI themes for the application.
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Represents the overall global state of the application.
 * This interface aggregates all major data models and UI state.
 */
export interface AppState {
  products: Product[]; // List of all available products
  transactions: Transaction[]; // List of all past and current transactions
  cart: CartItem[]; // Items currently in the user's shopping cart
  contacts: Contact[]; // List of all contacts (customers, suppliers, etc.)
  ledger: LedgerEntry[]; // The financial ledger containing all entries
  currentView: View; // The currently active view/page in the application
  currentTheme: Theme; // The currently selected UI theme
  isLoading: boolean; // Global flag to indicate if data is currently being loaded
  error: string | null; // Global state to hold any application-wide error message
}