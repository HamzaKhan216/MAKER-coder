/**
 * @file src/types.ts
 * @description Defines all core TypeScript interfaces and types for the application.
 */

/**
 * Represents the different views or pages available in the application.
 */
export type View = 'dashboard' | 'products' | 'cart' | 'transactions' | 'contacts' | 'ledger' | 'settings' | 'reports';

/**
 * Defines the visual theme properties for the application.
 */
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  // Add more theme properties like borderRadius, spacing, etc. as needed
}

/**
 * Represents a product available for sale.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Stored in base units (e.g., cents) or as a float
  stock: number;
  imageUrl?: string;
  category: string;
  sku?: string; // Stock Keeping Unit
  isActive: boolean;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  productId: string;
  name: string; // Denormalized for convenience
  imageUrl?: string; // Denormalized for convenience
  price: number; // Price per unit at the time of adding to cart (or current)
  quantity: number;
}

/**
 * Represents the possible statuses of a transaction.
 */
export type TransactionStatus = 'pending' | 'completed' | 'cancelled' | 'refunded' | 'failed';

/**
 * Represents a completed order or financial transaction.
 */
export interface Transaction {
  id: string;
  items: Omit<CartItem, 'productId'> & { productId: string; }[]; // Items as they were at purchase
  totalAmount: number; // Total amount of the transaction
  transactionDate: string; // ISO 8601 string
  status: TransactionStatus;
  contactId?: string; // Optional: ID of the customer/contact involved
  paymentMethod?: string; // e.g., 'Credit Card', 'Cash', 'PayPal'
  notes?: string;
  // Additional fields like shipping address, tax, discount, etc.
}

/**
 * Represents the possible types of a contact.
 */
export type ContactType = 'customer' | 'supplier' | 'employee' | 'other';

/**
 * Represents contact information for a customer, supplier, or other entity.
 */
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  type: ContactType;
  company?: string;
  notes?: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

/**
 * Represents the possible types of a ledger entry.
 */
export type LedgerEntryType = 'income' | 'expense' | 'asset' | 'liability' | 'equity';

/**
 * Represents a single financial entry in the general ledger.
 */
export interface LedgerEntry {
  id: string;
  date: string; // ISO 8601 string
  description: string;
  type: LedgerEntryType;
  amount: number; // Positive for credit, negative for debit (or vice versa, define convention)
  category?: string; // e.g., 'Sales Revenue', 'Rent Expense', 'Cash'
  associatedId?: string; // Optional: ID of a related Transaction or Contact
  notes?: string;
}

/**
 * Represents the overall state of the application.
 */
export interface AppState {
  currentView: View;
  theme: Theme;
  products: Product[];
  cart: CartItem[];
  transactions: Transaction[];
  contacts: Contact[];
  ledger: LedgerEntry[];
  isLoading: boolean; // General loading indicator
  error: string | null; // General error message
  lastUpdated: string; // ISO 8601 string of when the state was last persisted/updated
  // Add any user authentication state here if applicable
  // user?: UserProfile;
}
