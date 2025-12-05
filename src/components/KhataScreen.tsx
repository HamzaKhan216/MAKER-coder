import React, { useState, useRef } from 'react';

// Define interfaces for better type safety
interface Transaction {
  id: string;
  type: 'credit' | 'payment'; // 'credit' means customer owes us (increases balance), 'payment' means customer paid us (decreases balance)
  amount: number;
  date: string;
  description?: string;
}

interface Contact {
  id: string;
  name: string;
  balance: number; // Positive if customer owes us, negative if we owe customer (credit balance)
  transactions: Transaction[];
}

const KhataScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Rohan Sharma',
      balance: 1500, // Rohan owes us 1500
      transactions: [
        { id: 't1', type: 'credit', amount: 2000, date: '2023-10-20', description: 'Goods sold' },
        { id: 't2', type: 'payment', amount: 500, date: '2023-10-21', description: 'Partial payment' },
      ],
    },
    {
      id: '2',
      name: 'Priya Singh',
      balance: -750, // We owe Priya 750 (or Priya has a credit of 750)
      transactions: [
        { id: 't3', type: 'payment', amount: 1000, date: '2023-10-18', description: 'Advance payment' },
        { id: 't4', type: 'credit', amount: 250, date: '2023-10-19', description: 'Minor adjustment' },
      ],
    },
  ]);

  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showRecordTransactionModal, setShowRecordTransactionModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // Refs for input fields in modals
  const newContactNameRef = useRef<HTMLInputElement>(null);
  const transactionAmountRef = useRef<HTMLInputElement>(null);
  const transactionTypeRef = useRef<HTMLSelectElement>(null);
  const transactionDescriptionRef = useRef<HTMLInputElement>(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Utility function to generate a simple unique ID
  const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

  const handleAddContact = () => {
    const name = newContactNameRef.current?.value.trim();
    if (name) {
      const newContact: Contact = {
        id: generateUniqueId(),
        name,
        balance: 0,
        transactions: [],
      };
      setContacts(prev => [...prev, newContact]);
      setShowAddContactModal(false);
      if (newContactNameRef.current) newContactNameRef.current.value = ''; // Clear input field
    } else {
      alert('Contact name cannot be empty.');
    }
  };

  const handleRecordTransaction = () => {
    if (!selectedContactId) return;

    const amountStr = transactionAmountRef.current?.value.trim();
    const type = transactionTypeRef.current?.value as 'credit' | 'payment';
    const description = transactionDescriptionRef.current?.value.trim() || '';

    const amount = parseFloat(amountStr || '0');

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }

    const newTransaction: Transaction = {
      id: generateUniqueId(),
      type,
      amount,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      description,
    };

    setContacts(prevContacts =>
      prevContacts.map(contact => {
        if (contact.id === selectedContactId) {
          let newBalance = contact.balance;
          if (type === 'credit') {
            newBalance += amount; // Customer owes us more
          } else { // type === 'payment'
            newBalance -= amount; // Customer paid us, reducing what they owe or creating a credit
          }
          return {
            ...contact,
            balance: newBalance,
            transactions: [...contact.transactions, newTransaction],
          };
        }
        return contact;
      })
    );

    setShowRecordTransactionModal(false);
    setSelectedContactId(null);
    // Clear input fields after recording transaction
    if (transactionAmountRef.current) transactionAmountRef.current.value = '';
    if (transactionDescriptionRef.current) transactionDescriptionRef.current.value = '';
    if (transactionTypeRef.current) transactionTypeRef.current.value = 'credit'; // Reset to default
  };

  const openRecordTransactionForContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setShowRecordTransactionModal(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Khata Book</h1>

      <div style={styles.buttonContainer}>
        <button onClick={() => setShowAddContactModal(true)} style={styles.primaryButton}>
          + Add New Contact
        </button>
      </div>

      <div style={styles.contactList}>
        {contacts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No contacts yet. Add your first customer!</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} style={styles.contactItem}>
              <div style={styles.contactInfo}>
                <h3 style={styles.contactName}>{contact.name}</h3>
                <p style={{ ...styles.contactBalance, color: contact.balance >= 0 ? '#d9534f' : '#5cb85c' }}>
                  {contact.balance >= 0 ? 'Owes you:' : 'You owe:'} ₹{Math.abs(contact.balance).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => openRecordTransactionForContact(contact.id)}
                style={styles.secondaryButton}
              >
                Record Transaction
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Add New Contact</h2>
            <input
              type="text"
              ref={newContactNameRef}
              placeholder="Contact Name"
              style={styles.inputField}
            />
            <div style={styles.modalActions}>
              <button onClick={handleAddContact} style={styles.primaryButton}>
                Add Contact
              </button>
              <button onClick={() => setShowAddContactModal(false)} style={styles.secondaryButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Transaction Modal */}
      {showRecordTransactionModal && selectedContact && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Record Transaction for {selectedContact.name}</h2>
            <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
              Current Balance: <span style={{ fontWeight: 'bold', color: selectedContact.balance >= 0 ? '#d9534f' : '#5cb85c' }}>₹{selectedContact.balance.toFixed(2)}</span>
            </p>
            <input
              type="number"
              ref={transactionAmountRef}
              placeholder="Amount"
              min="0.01"
              step="0.01"
              style={styles.inputField}
            />
            <select ref={transactionTypeRef} style={styles.inputField} defaultValue="credit">
              <option value="credit">Customer owes you (Credit)</option>
              <option value="payment">Customer paid you (Payment)</option>
            </select>
            <input
              type="text"
              ref={transactionDescriptionRef}
              placeholder="Description (Optional)"
              style={styles.inputField}
            />
            <div style={styles.modalActions}>
              <button onClick={handleRecordTransaction} style={styles.primaryButton}>
                Record
              </button>
              <button onClick={() => setShowRecordTransactionModal(false)} style={styles.secondaryButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic inline styles for a clean, modern look
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: '25px',
    textAlign: 'right',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  contactList: {
    marginTop: '20px',
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '18px 25px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  contactInfo: {
    flexGrow: 1,
  },
  contactName: {
    margin: '0',
    color: '#343a40',
    fontSize: '1.2em',
    fontWeight: '500',
  },
  contactBalance: {
    margin: '8px 0 0',
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '35px',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    width: '450px',
    maxWidth: '90%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputField: {
    width: 'calc(100% - 22px)', // Account for padding
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  modalActions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
};

export default KhataScreen;
