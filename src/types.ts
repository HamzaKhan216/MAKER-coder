/**
 * Core TypeScript Interfaces and Types for the Application.
 * Defines the structure for various data models used throughout the system,
 * including application state, business entities, and utility types.
 */

// 1. View: Represents the different screens or sections of the application.
export type View =
  | 'dashboard'
  | 'products'
  | 'cart'
  | 'checkout'
  | 'transactions'
  | 'contacts'
  | 'ledger'
  | 'settings'
  | 'login'
  | 'signup';

// 2. Theme: Defines the visual styling properties for the application.
export interface Theme {
  primaryColor: string;     // e.g., '#007bff'
  secondaryColor: string;   // e.g., '#6c757d'
  accentColor: string;      // e.g., '#28a745'
  backgroundColor: string;  // e.g., '#f8f9fa'
  textColor: string;        // e.g., '#212529'
  fontFamily: string;       // e.g., 'Arial, sans-serif'
  fontSizeBase: string;     // e.g., '16px' or '1rem'
}

// 3. Product: Represents an item available for sale.
export interface Product {
  id: string;               // Unique identifier for the product
  name: string;             // Name of the product
  description: string;      // Detailed description of the product
  price: number;            // Price of the product (e.g., USD, EUR). Use number for simplicity, BigInt for cents in real financial apps.
  stock: number;            // Current stock quantity available
  imageUrl?: string;        // Optional URL to the product image
  category?: string;        // Optional category for the product (e.g., 'Electronics', 'Books')
  sku?: string;             // Optional Stock Keeping Unit
  createdAt?: string;       // ISO Date string when the product was created
  updatedAt?: string;       // ISO Date string when the product was last updated
}

// 4. CartItem: Represents a product added to the shopping cart.
export interface CartItem {
  productId: string;        // ID of the product being added
  name: string;             // Name of the product (denormalized for display)
  price: number;            // Price of the product at the time it was added to cart
  quantity: number;         // Quantity of this product in the cart
  imageUrl?: string;        // Optional URL to the product image (denormalized for display)
}

// 5. Transaction: Represents a completed financial transaction (e.g., a sale).
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'paypal' | 'cash' | 'bank_transfer' | 'other';

export interface Transaction {
  id: string;               // Unique identifier for the transaction
  timestamp: string;        // ISO Date string when the transaction occurred
  items: CartItem[];        // Snapshot of items and their prices at the time of transaction
  totalAmount: number;      // Total amount of the transaction
  paymentMethod: PaymentMethod; // Method used for payment
  status: TransactionStatus;    // Current status of the transaction
  customerId?: string;      // Optional ID linking to a Contact (customer)
  customerName?: string;    // Denormalized customer name for quick reference
  notes?: string;           // Any additional notes about the transaction
}

// 6. Contact: Represents a person or organization contact (e.g., customer, supplier).
export type ContactType = 'customer' | 'supplier' | 'employee' | 'other';

export interface Contact {
  id: string;               // Unique identifier for the contact
  name: string;             // Full name of the contact or organization
  email?: string;           // Optional email address
  phone?: string;           // Optional phone number
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };                          // Optional structured address
  type: ContactType;        // Type of contact (customer, supplier, etc.)
  company?: string;         // Optional company name if applicable
  notes?: string;           // Any additional notes about the contact
  createdAt?: string;       // ISO Date string when the contact was created
  updatedAt?: string;       // ISO Date string when the contact was last updated
}

// 7. LedgerEntry: Represents a single entry in the financial ledger.
export type LedgerEntryType = 'credit' | 'debit';

export interface LedgerEntry {
  id: string;               // Unique identifier for the ledger entry
  timestamp: string;        // ISO Date string when the entry was recorded
  description: string;      // Description of the ledger entry
  amount: number;           // The amount of the entry
  type: LedgerEntryType;    // Whether it's a credit or a debit
  accountId?: string;       // Optional ID for the account affected (e.g., 'Cash', 'Bank', 'Expenses')
  transactionId?: string;   // Optional ID linking to a Transaction if related
  contactId?: string;       // Optional ID linking to a Contact if related
  notes?: string;           // Any additional notes for the ledger entry
}

// 8. AppState: The top-level state object for the entire application.
export interface AppState {
  currentView: View;        // The currently active view/page
  theme: Theme;             // Current application theme settings
  products: Product[];      // List of all products available
  cart: CartItem[];         // Current items in the shopping cart
  transactions: Transaction[]; // List of all recorded transactions
  contacts: Contact[];      // List of all contacts
  ledger: LedgerEntry[];    // List of all ledger entries
  isLoading: boolean;       // Flag indicating if an asynchronous operation is in progress
  error: string | null;     // Stores any global error message
  isAuthenticated: boolean; // Flag indicating if a user is currently logged in
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];        // e.g., ['admin', 'sales', 'viewer']
  } | null;                   // Currently logged-in user details, or null if not authenticated
  notifications: string[];  // Example: a list of recent application notifications
}
